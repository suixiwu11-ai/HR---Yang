"use client";

import { useEffect, useState } from "react";
import { useQuarter } from "@/components/AppShell";

const SUGGESTIONS = [
  "\u672c\u5b63 TCOW \u662f\u591a\u5c11\uff1f",
  "\u54ea\u6761\u4ea7\u54c1\u7ebf\u4eba\u529b\u6210\u672c\u7387\u6700\u9ad8\uff1f",
  "10\u00d7 Handoff \u91c7\u7eb3\u60c5\u51b5",
  "\u7f16\u5236\u8fbe\u6210\u7387\u662f\u591a\u5c11\uff1f",
];

type Msg = { role: "user" | "bot"; html: string; plain?: string };

export function CopilotPanel() {
  const { quarterId } = useQuarter();
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [llmOn, setLlmOn] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "bot",
      html: "\u6b63\u5728\u68c0\u6d4b\u95ee\u6570\u6a21\u5f0f\u2026",
    },
  ]);

  useEffect(() => {
    fetch("/api/copilot/ask")
      .then((r) => r.json())
      .then((d) => {
        setLlmOn(Boolean(d.llmEnabled));
        setMessages([
          {
            role: "bot",
            html: d.llmEnabled
              ? "Insight Copilot \u00b7 <strong>\u667a\u80fd\u95ee\u6570\u5df2\u5f00\u542f</strong>\uff0c\u57fa\u4e8e\u672c\u5b63\u6838\u7b97\u5feb\u7167\u3002\u53ef\u8fde\u7eed\u5bf9\u8bdd\u3002"
              : "Insight Copilot \u00b7 \u89c4\u5219\u95ee\u6570\u6a21\u5f0f\u3002\u8bf7\u5728 <code>.env.local</code> \u914d\u7f6e <code>LLM_API_KEY</code> \u542f\u7528\u5927\u6a21\u578b\u3002",
          },
        ]);
      })
      .catch(() => {});
  }, []);

  async function send(q?: string) {
    const text = (q ?? question).trim();
    if (!text || loading) return;

    const history = messages
      .filter((m) => m.plain)
      .map((m) => ({
        role: m.role === "user" ? ("user" as const) : ("assistant" as const),
        content: m.plain!,
      }));

    setMessages((m) => [...m, { role: "user", html: text, plain: text }]);
    setQuestion("");
    setLoading(true);

    try {
      const res = await fetch("/api/copilot/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text, quarterId, history }),
      });
      const d = await res.json();
      const plain = typeof d.answer === "string" ? stripHtml(d.answer) : "";
      setMessages((m) => [
        ...m,
        {
          role: "bot",
          html: (d.answer ?? "\u65e0\u56de\u590d") + (d.mode === "llm" ? "" : ""),
          plain,
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "bot", html: "\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\u3002" },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <aside className="copilot-panel">
      <h3>
        Insight Copilot
        {llmOn && <span className="badge accent">LLM</span>}
      </h3>
      <div style={{ maxHeight: 320, overflowY: "auto", marginBottom: 8 }}>
        {messages.map((msg, i) =>
          msg.role === "user" ? (
            <p key={i} className="copilot-msg" style={{ background: "var(--accent-soft)" }}>
              {msg.html}
            </p>
          ) : (
            <div
              key={i}
              className="copilot-msg bot"
              dangerouslySetInnerHTML={{ __html: msg.html }}
            />
          )
        )}
        {loading && <p className="copilot-msg bot">{"\u601d\u8003\u4e2d\u2026"}</p>}
      </div>
      <div className="copilot-chips">
        {SUGGESTIONS.map((s) => (
          <button key={s} type="button" disabled={loading} onClick={() => send(s)}>
            {s}
          </button>
        ))}
      </div>
      <div className="copilot-input">
        <input
          value={question}
          disabled={loading}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
          placeholder={llmOn ? "\u968f\u4fbf\u95ee\u2026" : "\u8f93\u5165\u95ee\u9898\u2026"}
        />
        <button type="button" onClick={() => send()} disabled={loading}>
          {loading ? "\u2026" : "\u53d1\u9001"}
        </button>
      </div>
    </aside>
  );
}

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}
