export type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

const DEFAULT_FETCH_TIMEOUT_MS = 55_000;

/** Strip whitespace and surrounding quotes from .env / Netlify imports */
export function cleanEnv(value?: string): string | undefined {
  if (value == null || value === "") return undefined;
  return value.trim().replace(/^['"]+|['"]+$/g, "");
}

function normalizeBaseUrl(raw: string): string {
  let baseUrl = raw.replace(/\/$/, "");
  if (baseUrl.endsWith("/chat/completions")) {
    baseUrl = baseUrl.slice(0, -"/chat/completions".length).replace(/\/$/, "");
  }
  return baseUrl;
}

function getLlmConfig() {
  const apiKey =
    cleanEnv(process.env.LLM_API_KEY) ||
    cleanEnv(process.env.DASHSCOPE_API_KEY) ||
    cleanEnv(process.env.OPENAI_API_KEY);
  const provider = (cleanEnv(process.env.LLM_PROVIDER) || "qwen").toLowerCase();

  let baseUrl = cleanEnv(process.env.LLM_BASE_URL);
  let model = cleanEnv(process.env.LLM_MODEL);

  if (!baseUrl) {
    baseUrl =
      provider === "qwen"
        ? "https://dashscope.aliyuncs.com/compatible-mode/v1"
        : "https://api.deepseek.com/v1";
  }
  if (!model) {
    // qwen-plus 在百炼控制台开通面最广；qwen3.5-plus 需在控制台已开通
    model = provider === "qwen" ? "qwen-plus" : "deepseek-chat";
  }

  const timeoutMs =
    Number(cleanEnv(process.env.LLM_FETCH_TIMEOUT_MS)) || DEFAULT_FETCH_TIMEOUT_MS;

  return {
    apiKey,
    baseUrl: normalizeBaseUrl(baseUrl),
    model,
    timeoutMs,
    provider,
  };
}

export function getLlmDebugInfo() {
  const { baseUrl, model, timeoutMs, provider, apiKey } = getLlmConfig();
  let baseUrlHost = baseUrl;
  let baseUrlValid = true;
  try {
    baseUrlHost = new URL(baseUrl).host;
  } catch {
    baseUrlValid = false;
    baseUrlHost = "(invalid LLM_BASE_URL)";
  }
  return {
    provider,
    baseUrlHost,
    baseUrlValid,
    model,
    timeoutMs,
    hasApiKey: Boolean(apiKey),
  };
}

export function isLlmEnabled() {
  return Boolean(getLlmConfig().apiKey);
}

function formatFetchError(e: unknown, timeoutMs: number, requestUrl: string): Error {
  const err = e instanceof Error ? e : new Error(String(e));
  let host = requestUrl;
  try {
    host = new URL(requestUrl).host;
  } catch {
    /* keep raw */
  }

  const cause =
    err.cause instanceof Error
      ? err.cause.message
      : err.cause != null
        ? String(err.cause)
        : "";

  const isTimeout =
    err.name === "AbortError" ||
    err.name === "TimeoutError" ||
    /aborted|timeout/i.test(err.message);

  if (isTimeout) {
    return new Error(`LLM 请求超时（${timeoutMs}ms），目标 ${host}`);
  }

  const netlifyHint =
    host.includes("dashscope.aliyuncs.com") && !host.includes("dashscope-intl")
      ? "；Netlify 海外节点可试 LLM_BASE_URL=https://dashscope-intl.aliyuncs.com/compatible-mode/v1"
      : "";

  const isDev = process.env.NODE_ENV === "development";
  if (isDev) {
    const parts = [`LLM fetch failed: ${err.message}`];
    if (cause) parts.push(`cause: ${cause}`);
    parts.push(`host: ${host}`);
    if (netlifyHint) parts.push(netlifyHint.replace(/^；/, ""));
    return new Error(parts.join(" | "));
  }

  const detail = cause ? ` (${cause})` : "";
  return new Error(`fetch failed${detail}${netlifyHint}`);
}

/** OpenAI 兼容 Chat Completions（DeepSeek / 通义 / 多数国内厂商） */
export async function chatCompletion(messages: ChatMessage[]): Promise<string | null> {
  const { apiKey, baseUrl, model, timeoutMs } = getLlmConfig();
  if (!apiKey) return null;

  const url = `${baseUrl}/chat/completions`;
  let res: Response;
  try {
    res = await fetch(url, {
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
      signal: AbortSignal.timeout(timeoutMs),
    });
  } catch (e) {
    throw formatFetchError(e, timeoutMs, url);
  }

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
