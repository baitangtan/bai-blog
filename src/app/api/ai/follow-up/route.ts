import { NextResponse } from "next/server";
import { DEEPSEEK_API_KEY, DEEPSEEK_BASE_URL } from "@/lib/deepseek";

export const maxDuration = 300;

export async function POST(request: Request) {
  const { system_prompt, user_message } = await request.json();

  if (!system_prompt || !user_message) {
    return NextResponse.json(
      { error: "缺少必要参数" },
      { status: 400 },
    );
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const response = await fetch(
          `${DEEPSEEK_BASE_URL}/chat/completions`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
            },
            body: JSON.stringify({
              model: "mimo-v2.5",
              stream: true,
              messages: [
                { role: "system", content: system_prompt },
                { role: "user", content: user_message },
              ],
            }),
          },
        );

        if (!response.ok) {
          const errText = await response.text();
          console.error("DeepSeek API error:", response.status, errText);
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ content: "AI服务暂时不可用，请稍后重试" })}\n\n`),
          );
          controller.close();
          return;
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        if (!reader) {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ content: "无法读取AI响应" })}\n\n`),
          );
          controller.close();
          return;
        }

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || !trimmed.startsWith("data: ")) continue;

            const data = trimmed.slice(6);
            if (data === "[DONE]") continue;

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                controller.enqueue(
                  encoder.encode(`data: ${JSON.stringify({ content })}\n\n`),
                );
              }
            } catch {
              // skip malformed chunks
            }
          }
        }
      } catch (err) {
        console.error("Follow-up stream error:", err);
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ content: "请求失败，请重试" })}\n\n`),
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
