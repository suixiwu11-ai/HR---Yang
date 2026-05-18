import { NextResponse } from "next/server";
import { askCopilot } from "@/lib/copilot";

export async function POST(req: Request) {
  const { question, quarterId } = await req.json();
  if (!question) return NextResponse.json({ error: "question required" }, { status: 400 });
  const result = askCopilot(String(question), String(quarterId ?? "2025Q3"));
  return NextResponse.json(result);
}
