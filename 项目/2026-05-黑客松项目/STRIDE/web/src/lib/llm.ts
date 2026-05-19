export type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

function getLlmConfig() {
  const apiKey =
    process.env.LLM_API_KEY ||
    process.env.DASHSCOPE_API_KEY ||
    process.env.OPENAI_API_KEY;
  const provider = (process.env.LLM_PROVIDER || "qwen").toLowerCase();

  let baseUrl = process.env.LLM_BASE_URL;
  let model = process.env.LLM_MODEL;

  if (!baseUrl) {
    baseUrl =
      provider === "qwen"
        ? "https://dashscope.aliyuncs.com/compatible-mode/v1"
        : "https://api.deepseek.com/v1";
  }
  if (!model) {
    model = provider === "qwen" ? "qwen3.5-plus" : "deepseek-chat";
  }

  return { apiKey, baseUrl: baseUrl.replace(/\/$/, ""), model };
}

export function isLlmEnabled() {
  return Boolean(getLlmConfig().apiKey);
}

/** OpenAI 兼容 Chat Completions（DeepSeek / 通义 / 多数国内厂商） */
export async function chatCompletion(messages: ChatMessage[]): Promise<string | null> {
  const { apiKey, baseUrl, model } = getLlmConfig();
  if (!apiKey) return null;

  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.3,
      max_tokens: 1024,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`LLM ${res.status}: ${err.slice(0, 200)}`);
  }

  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  return data.choices?.[0]?.message?.content?.trim() ?? null;
}

export function markdownToHtml(text: string): string {
  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return esc(text)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br/>");
}
