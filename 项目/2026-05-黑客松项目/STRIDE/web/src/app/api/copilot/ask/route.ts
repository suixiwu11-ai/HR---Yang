import { NextResponse } from "next/server";
import { askCopilot } from "@/lib/copilot";
import { isLlmEnabled } from "@/lib/llm";

export async function GET() {
  return NextResponse.json({ llmEnabled: isLlmEnabled() });
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
