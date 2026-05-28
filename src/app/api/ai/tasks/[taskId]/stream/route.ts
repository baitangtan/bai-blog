import { supabaseServer } from "@/lib/supabase-server";
import { callDeepSeekStream } from "@/lib/deepseek";
import {
  buildLiuyaoSystemPrompt,
  buildLiuyaoUserPrompt,
} from "@/lib/prompts/liuyao";
import {
  buildLiurenSystemPrompt,
  buildLiurenUserPrompt,
} from "@/lib/prompts/liuren";
import {
  buildQimenSystemPrompt,
  buildQimenUserPrompt,
} from "@/lib/prompts/qimen";
import {
  buildTaiyiSystemPrompt,
  buildTaiyiUserPrompt,
} from "@/lib/prompts/taiyi";

type PromptBuilder = {
  system: () => string;
  user: (p: Record<string, unknown>) => string;
};

const PROMPTS: Record<string, PromptBuilder> = {
  liuyao: { system: buildLiuyaoSystemPrompt, user: buildLiuyaoUserPrompt as unknown as PromptBuilder["user"] },
  liuren: { system: buildLiurenSystemPrompt, user: buildLiurenUserPrompt as unknown as PromptBuilder["user"] },
  qimen: { system: buildQimenSystemPrompt, user: buildQimenUserPrompt as unknown as PromptBuilder["user"] },
  taiyi: { system: buildTaiyiSystemPrompt, user: buildTaiyiUserPrompt as unknown as PromptBuilder["user"] },
};

export const maxDuration = 300;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ taskId: string }> },
) {
  const { taskId } = await params;

  const { data: task } = await supabaseServer
    .from("ai_tasks")
    .select("*")
    .eq("task_id", taskId)
    .single();

  if (!task) {
    return new Response(JSON.stringify({ error: "Task not found" }), {
      status: 404,
    });
  }

  // If task already completed, send result immediately
  if (task.status === "completed" && task.result_analysis) {
    const stream = new ReadableStream({
      start(controller) {
        const enc = new TextEncoder();
        const send = (d: object) =>
          controller.enqueue(enc.encode(`data: ${JSON.stringify(d)}\n\n`));
        send({ type: "init", content: "正在恢复解读结果..." });
        // Split into chunks for typewriter effect
        const fullText = task.result_analysis;
        const chunkSize = 120;
        let seq = 0;
        for (let i = 0; i < fullText.length; i += chunkSize) {
          seq++;
          send({ type: "token", content: fullText.slice(0, i + chunkSize), seq });
        }
        send({ type: "done" });
        controller.close();
      },
    });
    return new Response(stream, { headers: sseHeaders() });
  }

  const payload = task.request_payload || {};
  const bizType = task.biz_type || payload.biz_type || "liuyao";
  const promptBuilder = PROMPTS[bizType] || PROMPTS.liuyao;
  const systemPrompt = promptBuilder.system();
  const userPrompt = promptBuilder.user(payload as Record<string, unknown>);

  const abortController = new AbortController();

  const stream = new ReadableStream({
    async start(controller) {
      const enc = new TextEncoder();
      const send = (d: object) => {
        try {
          controller.enqueue(enc.encode(`data: ${JSON.stringify(d)}\n\n`));
        } catch {
          // stream closed
        }
      };

      let seq = 0;
      let resultContent = "";
      let reasoningContent = "";

      try {
        await supabaseServer
          .from("ai_tasks")
          .update({
            status: "processing",
            updated_at: new Date().toISOString(),
          })
          .eq("task_id", taskId);

        send({ type: "init", content: "正在连接智能体..." });
        send({ type: "phase", message: "智能体正在分析卦象..." });
        send({ type: "status", status: "processing", progress: 10 });

        const deepseekStream = await callDeepSeekStream(
          systemPrompt,
          userPrompt,
          abortController.signal,
        );

        send({ type: "phase", message: "智能体正在深度推理..." });
        send({ type: "status", status: "processing", progress: 30 });

        const reader = deepseekStream.getReader();
        let resultStarted = false;
        let tokenBuffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          // Accumulate reasoning silently (don't stream to frontend)
          if (value.reasoningContent) {
            reasoningContent += value.reasoningContent;
          }

          // Stream only the structured result to frontend
          if (value.content) {
            if (!resultStarted) {
              resultStarted = true;
              send({
                type: "phase",
                message: "智能体正在整理解读结果...",
              });
              send({ type: "status", status: "processing", progress: 70 });
            }
            tokenBuffer += value.content;
            resultContent += value.content;

            // Send buffered chunks every ~80 chars for smooth typewriter effect
            if (tokenBuffer.length >= 80) {
              seq++;
              send({ type: "token", content: tokenBuffer, seq });
              tokenBuffer = "";
            }
          }
        }

        // Send remaining buffer
        if (tokenBuffer.length > 0) {
          seq++;
          send({ type: "token", content: tokenBuffer, seq });
        }

        // Save results to DB
        await supabaseServer
          .from("ai_tasks")
          .update({
            status: "completed",
            result_analysis: resultContent,
            reasoning_process: reasoningContent,
            updated_at: new Date().toISOString(),
          })
          .eq("task_id", taskId);

        send({ type: "done" });
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") {
          send({ type: "error", content: "任务已取消" });
        } else {
          console.error("Stream error:", err);
          send({ type: "error", content: "智能体服务出现错误，请重试" });
          await supabaseServer
            .from("ai_tasks")
            .update({
              status: "failed",
              updated_at: new Date().toISOString(),
            })
            .eq("task_id", taskId);
        }
      } finally {
        controller.close();
      }
    },
    cancel() {
      abortController.abort();
    },
  });

  return new Response(stream, { headers: sseHeaders() });
}

function sseHeaders(): HeadersInit {
  return {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive",
    "X-Accel-Buffering": "no",
  };
}
