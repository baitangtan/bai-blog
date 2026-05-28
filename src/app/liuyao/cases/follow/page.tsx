"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function FollowContent() {
  const searchParams = useSearchParams();
  const caseId = searchParams.get("id");

  const [caseData, setCaseData] = useState<Record<string, unknown> | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [streaming, setStreaming] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!caseId) {
      setError("缺少卦例ID");
      setLoading(false);
      return;
    }
    fetch(`/liuyao/api/cases/${caseId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          setCaseData(data.case);
        } else {
          setError(data.message || "加载失败");
        }
      })
      .catch(() => setError("网络错误"))
      .finally(() => setLoading(false));
  }, [caseId]);

  const handleFollowUp = async () => {
    if (!question.trim() || streaming) return;
    setStreaming(true);
    setAnswer("");

    const systemPrompt = `你是一位精通六爻占卜的解卦大师。用户之前已经得到了一次完整的六爻解读，现在用户有追问。请基于之前的卦象和解读，回答用户的追问。

之前的基础卦象信息：
${typeof caseData?.base_guaxiang === "string" ? caseData.base_guaxiang : JSON.stringify(caseData?.base_guaxiang || {})}

之前的解读结果：
${caseData?.result_analysis || "无"}

请用中文回答，保持专业但易懂。`;

    try {
      const response = await fetch("/api/ai/follow-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_prompt: systemPrompt,
          user_message: question,
        }),
      });

      if (!response.ok) throw new Error("请求失败");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");
          for (const line of lines) {
            if (line.startsWith("data: ")) {
              try {
                const data = JSON.parse(line.slice(6));
                if (data.content) {
                  fullText += data.content;
                  setAnswer(fullText);
                }
              } catch {
                // skip
              }
            }
          }
        }
      }
    } catch {
      setAnswer("请求失败，请重试");
    } finally {
      setStreaming(false);
    }
  };

  useEffect(() => {
    if (resultRef.current) {
      resultRef.current.scrollTop = resultRef.current.scrollHeight;
    }
  }, [answer]);

  if (loading) {
    return (
      <div style={{ padding: 40, textAlign: "center", color: "#999" }}>
        加载中...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: 40, textAlign: "center", color: "#e74c3c" }}>
        {error}
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 800,
        margin: "0 auto",
        padding: "20px 16px",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <h1 style={{ fontSize: 22, marginBottom: 8 }}>追问解读</h1>
      <p style={{ color: "#666", fontSize: 14, marginBottom: 24 }}>
        基于已保存的卦例，向智能体追问更多细节
      </p>

      {/* 原始解读 */}
      <div
        style={{
          background: "#f8f9fa",
          borderRadius: 8,
          padding: 16,
          marginBottom: 20,
          maxHeight: 300,
          overflow: "auto",
        }}
      >
        <h3 style={{ fontSize: 15, marginBottom: 8, color: "#333" }}>
          原始解读
        </h3>
        <div style={{ fontSize: 14, lineHeight: 1.8, whiteSpace: "pre-wrap" }}>
          {(caseData?.result_analysis as string) || "暂无解读内容"}
        </div>
      </div>

      {/* 追问输入 */}
      <div style={{ marginBottom: 20 }}>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="请输入你的追问，例如：这个卦象对我最近的财运有什么具体影响？"
          style={{
            width: "100%",
            minHeight: 80,
            padding: 12,
            border: "1px solid #ddd",
            borderRadius: 8,
            fontSize: 14,
            resize: "vertical",
            boxSizing: "border-box",
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
              handleFollowUp();
            }
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 8,
          }}
        >
          <span style={{ fontSize: 12, color: "#999" }}>
            Ctrl+Enter 发送
          </span>
          <button
            onClick={handleFollowUp}
            disabled={!question.trim() || streaming}
            style={{
              padding: "8px 24px",
              background: streaming ? "#ccc" : "#7c3aed",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              fontSize: 14,
              cursor: streaming ? "not-allowed" : "pointer",
            }}
          >
            {streaming ? "思考中..." : "发送追问"}
          </button>
        </div>
      </div>

      {/* 回答 */}
      {answer && (
        <div
          ref={resultRef}
          style={{
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: 8,
            padding: 16,
            lineHeight: 1.8,
            fontSize: 14,
            whiteSpace: "pre-wrap",
            maxHeight: 500,
            overflow: "auto",
          }}
        >
          {answer}
        </div>
      )}

      {/* 返回按钮 */}
      <div style={{ marginTop: 20, textAlign: "center" }}>
        <a
          href="/liuyao"
          style={{ color: "#7c3aed", fontSize: 14, textDecoration: "none" }}
        >
          返回六爻页面
        </a>
      </div>
    </div>
  );
}

export default function FollowPage() {
  return (
    <Suspense
      fallback={
        <div style={{ padding: 40, textAlign: "center", color: "#999" }}>
          加载中...
        </div>
      }
    >
      <FollowContent />
    </Suspense>
  );
}
