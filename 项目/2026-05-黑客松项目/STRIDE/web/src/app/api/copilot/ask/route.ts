import { NextResponse } from "next/server";
import { askCopilot } from "@/lib/copilot";
import { getLlmDebugInfo, isLlmEnabled } from "@/lib/llm";

/** Netlify / 本地：确保 Node 运行时出站 fetch（避免 Edge 限制） */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET() {
  const llmEnabled = isLlmEnabled();
  const payload: { llmEnabled: boolean; debug?: ReturnType<typeof getLlmDebugInfo> } = {
    llmEnabled,
  };
  if (process.env.NODE_ENV === "development") {
    payload.debug = getLlmDebugInfo();
  }
  return NextResponse.json(payload);
}

export async function POST(req: Request) {
  const body = await req.json();
  const question = String(body.question ?? "");
  const quarterId = String(body.quarterId ?? "2025Q3");
  const history = Array.isArray(body.history) ? body.history : [];

  if (!question) {
    return NextResponse.json({ error: "question required" }, { status: 400 });
  }

  const result = await askCopilot(question, quarterId, history);
  return NextResponse.json(result);
}
