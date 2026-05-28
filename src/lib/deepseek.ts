export const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY!;
export const DEEPSEEK_BASE_URL =
  process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com";

export interface DeepSeekChunk {
  content: string;
  reasoningContent: string;
}

export async function callDeepSeekStream(
  systemPrompt: string,
  userPrompt: string,
  signal?: AbortSignal,
): Promise<ReadableStream<DeepSeekChunk>> {
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
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        stream: true,
      }),
      signal,
    },
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`DeepSeek API error ${response.status}: ${text}`);
  }

  const reader = response.body!.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  return new ReadableStream<DeepSeekChunk>({
    async pull(controller) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          controller.close();
          return;
        }

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop()!;

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || !trimmed.startsWith("data: ")) continue;
          const data = trimmed.slice(6);
          if (data === "[DONE]") {
            controller.close();
            return;
          }

          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta;
            if (delta) {
              controller.enqueue({
                content: delta.content || "",
                reasoningContent: delta.reasoning_content || "",
              });
            }
          } catch {
            // skip malformed chunks
          }
        }
      }
    },
  });
}
