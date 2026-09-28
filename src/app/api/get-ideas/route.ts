import { NextRequest, NextResponse } from "next/server";
import { getSaasIdeas } from "@/app/lib/actions";
export async function POST(request: NextRequest) {
  let keyword: unknown;
  try { keyword = (await request.json()).keyword; } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  if (typeof keyword !== "string" || keyword.trim().length < 3 || keyword.length > 160) return NextResponse.json({ error: "Enter a niche between 3 and 160 characters." }, { status: 400 });
  try { return NextResponse.json({ ideas: await getSaasIdeas(keyword.trim()) }); }
  catch { return NextResponse.json({ error: "The local AI model is unavailable. Please try again later." }, { status: 503 }); }
}
