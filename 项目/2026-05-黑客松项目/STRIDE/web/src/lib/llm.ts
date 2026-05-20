export type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

const DEFAULT_FETCH_TIMEOUT_MS = 55_000;

/** Strip whitespace and surrounding quotes from .env / Netlify imports */
export function cleanEnv(value?: string): string | undefined {
  if (value == null || value === "") return undefined;
  return value.trim().replace(/^['"]+|['"]+$/g, "");
}

/** 官方 DeepSeek base_url 为 https://api.deepseek.com（无 /v1）；本模块再拼 /chat/completions */
function normalizeBaseUrl(raw: string): string {
  let baseUrl = raw.replace(/\/$/, "");
  if (baseUrl.endsWith("/chat/completions")) {
    baseUrl = baseUrl.slice(0, -"/chat/completions".length).replace(/\/$/, "");
  }
  try {
    const host = new URL(baseUrl).host;
    if (host === "api.deepseek.com" && /\/v1$/i.test(baseUrl)) {
      baseUrl = baseUrl.replace(/\/v1$/i, "");
    }
  } catch {
    /* invalid URL surfaced in getLlmDebugInfo */
  }
  return baseUrl;
}

function getLlmConfig() {
  const apiKey =
    cleanEnv(process.env.LLM_API_KEY) ||
    cleanEnv(process.env.DASHSCOPE_API_KEY) ||
    cleanEnv(process.env.OPENAI_API_KEY);
  const provider = (cleanEnv(process.env.LLM_PROVIDER) || "deepseek").toLowerCase();

  let baseUrl = cleanEnv(process.env.LLM_BASE_URL);
  let model = cleanEnv(process.env.LLM_MODEL);

  if (!baseUrl) {
    baseUrl =
      provider === "qwen"
        ? "https://dashscope.aliyuncs.com/compatible-mode/v1"
        : "https://api.deepseek.com";
  }
  if (!model) {
    // deepseek-chat 为默认对话模型；deepseek-reasoner 为可选推理模型
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
    /** 仅开发环境：核对 Netlify/本地是否同一条 Key（末 4 位） */
    keySuffix:
      process.env.NODE_ENV === "development" && apiKey ? apiKey.slice(-4) : undefined,
  };
}

/** 将 HTTP 错误转为 Copilot 可读的中文说明 */
export function formatLlmHttpError(status: number, body: string, provider: string): string {
  const snippet = body.slice(0, 200).trim();
  if (status === 401) {
    if (provider === "qwen") {
      return [
        "通义 API Key 无效或未授权（401）。",
        "请在阿里云 DashScope 创建新 Key，填入 LLM_API_KEY；勿把 DeepSeek Key 填进通义配置。",
        "变量值勿加引号；Netlify 改后需重新部署。",
        snippet ? `接口返回：${snippet}` : "",
      ]
        .filter(Boolean)
        .join(" ");
    }
    return [
      "DeepSeek API Key 无效或未授权（401）。",
      "请按顺序排查：① 在 https://platform.deepseek.com/api_keys 创建新 Key（充值后建议新建，勿复用已失效 Key）；",
      "② 本地 .env.local 与 Netlify 的 LLM_API_KEY 填同一条，勿加引号、勿首尾空格；",
      "③ LLM_PROVIDER=deepseek，勿把阿里云 DashScope Key 填进 DeepSeek 槽位；",
      "④ Netlify 保存后 Clear cache and deploy。",
      snippet ? `接口返回：${snippet}` : "",
    ]
      .filter(Boolean)
      .join(" ");
  }
  if (status === 402 || /insufficient|balance|quota/i.test(snippet)) {
    return `账户余额或额度不足（${status}）。请在 DeepSeek 控制台充值后重试。${snippet ? ` ${snippet}` : ""}`;
  }
  return `LLM 请求失败（${status}）${snippet ? `：${snippet}` : ""}`;
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

  let helpHint = "；请检查 LLM_API_KEY 与 LLM_BASE_URL（勿加引号）";
  if (host.includes("api.deepseek.com")) {
    helpHint =
      "；请在 https://platform.deepseek.com/api_keys 核对 Key、余额与 LLM_BASE_URL=https://api.deepseek.com（勿多写 /v1）";
  } else if (
    host.includes("dashscope.aliyuncs.com") &&
    !host.includes("dashscope-intl")
  ) {
    helpHint =
      "；通义可选：Netlify 海外节点试 LLM_BASE_URL=https://dashscope-intl.aliyuncs.com/compatible-mode/v1";
  }

  const isDev = process.env.NODE_ENV === "development";
  if (isDev) {
    const parts = [`LLM fetch failed: ${err.message}`];
    if (cause) parts.push(`cause: ${cause}`);
    parts.push(`host: ${host}`);
    if (helpHint) parts.push(helpHint.replace(/^；/, ""));
    return new Error(parts.join(" | "));
  }

  const detail = cause ? ` (${cause})` : "";
  return new Error(`fetch failed${detail}${helpHint}`);
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
    const { provider } = getLlmConfig();
    throw new Error(formatLlmHttpError(res.status, err, provider));
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
