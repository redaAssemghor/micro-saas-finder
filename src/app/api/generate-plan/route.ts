import { NextRequest, NextResponse } from "next/server";
import { parseSettings } from "@/lib/plans";
import { generatePlan } from "@/lib/ai";
export const runtime = "nodejs";
export const maxDuration = 60;
export async function POST(request: NextRequest) {
  if (Number(request.headers.get("content-length")) > 12000) return NextResponse.json({ error: "Brief is too large." }, { status: 413 });
  let input: unknown;
  try { const text = await request.text(); if (text.length > 12000) return NextResponse.json({ error: "Brief is too large." }, { status: 413 }); input = JSON.parse(text); }
  catch { return NextResponse.json({ error: "Send a valid brief." }, { status: 400 }); }
  const settings = parseSettings(input);
  if (!settings) return NextResponse.json({ error: "Check your niche, categories, and settings." }, { status: 400 });
  try { return NextResponse.json({ plan: await generatePlan(settings) }); }
  catch (error) {
    const invalid = error instanceof Error && error.message === "INVALID_PLAN";
    return NextResponse.json({ error: invalid ? "The model returned an incomplete plan. Please try again." : "The AI model is unavailable. Start Ollama and install the selected Qwen model on the server, then retry." }, { status: 503 });
  }
}
