"use client";

import { useState } from "react";
import { useQuarter } from "@/components/AppShell";

const SUGGESTIONS = [
  "\u672c\u5b63 TCOW \u662f\u591a\u5c11\uff1f",
  "\u54ea\u6761\u4ea7\u54c1\u7ebf\u4eba\u529b\u6210\u672c\u7387\u6700\u9ad8\uff1f",
  "10\u00d7 Handoff \u91c7\u7eb3\u60c5\u51b5",
  "\u7f16\u5236\u8fbe\u6210\u7387\u662f\u591a\u5c11\uff1f",
];

export function CopilotPanel() {
  const { quarterId } = useQuarter();
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "bot"; html: string }[]>([
    {
      role: "bot",
      html:
        "Insight Copilot \u00b7 \u89c4\u5219\u95ee\u6570\u3002\u8bf7\u7528\u6807\u51c6\u95ee\u6cd5\u8be2\u95ee TCOW\u3001\u4eba\u529b\u6210\u672c\u7387\u300110\u00d7\u3001\u7f16\u5236\u8fbe\u6210\u3002",
    },
  ]);

  async function send(q?: string) {
    const text = (q ?? question).trim();
    if (!text) return;
    setMessages((m) => [...m, { role: "user", html: text }]);
    setQuestion("");
    const res = await fetch("/api/copilot/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: text, quarterId }),
    });
    const d = await res.json();
    setMessages((m) => [...m, { role: "bot", html: d.answer ?? "" }]);
  }

  return (
    <aside className="copilot-panel">
      <h3>Insight Copilot</h3>
      {messages.map((msg, i) =>
        msg.role === "user" ? (
          <p key={i} className="copilot-msg">
            {msg.html}
          </p>
        ) : (
          <div key={i} className="copilot-msg bot" dangerouslySetInnerHTML={{ __html: msg.html }} />
        )
      )}
      <div className="copilot-chips" style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "0.5rem" }}>
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => send(s)}
            style={{
              fontSize: "0.65rem",
              padding: "0.25rem 0.5rem",
              borderRadius: 999,
              border: "1px solid var(--border)",
              background: "var(--bg)",
              cursor: "pointer",
            }}
          >
            {s}
          </button>
        ))}
      </div>
      <div className="copilot-input">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="\u8f93\u5165\u95ee\u9898\u2026"
        />
        <button type="button" onClick={() => send()}>
          \u53d1\u9001
        </button>
      </div>
    </aside>
  );
}
