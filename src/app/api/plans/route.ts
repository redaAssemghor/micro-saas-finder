import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { isPlan } from "@/lib/plans";
import { getPlans, mutatePlan } from "@/lib/plan-store";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
function owner() { return process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY ? auth().userId : null; }
const unauthorized = () => NextResponse.json({ error: "Sign in to save plans to your profile." }, { status: 401 });
const unavailable = () => NextResponse.json({ error: "Profile storage is unavailable. Export your plan and try again later." }, { status: 503 });
export async function GET() {
  const userId = owner(); if (!userId) return unauthorized();
  try { return NextResponse.json({ plans: await getPlans(userId) }, { headers: { "Cache-Control": "private, no-store" } }); } catch { return unavailable(); }
}
export async function POST(request: NextRequest) {
  const userId = owner(); if (!userId) return unauthorized();
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return NextResponse.json({ error: "Invalid origin." }, { status: 403 });
  let plan: unknown;
  try { const raw = await request.text(); if (raw.length > 65000) return NextResponse.json({ error: "Plan is too large." }, { status: 413 }); plan = JSON.parse(raw); }
  catch { return NextResponse.json({ error: "Invalid plan." }, { status: 400 }); }
  if (!isPlan(plan)) return NextResponse.json({ error: "Invalid plan." }, { status: 400 });
  try { await mutatePlan(userId, plan); return NextResponse.json({ saved: true }); } catch { return unavailable(); }
}
export async function DELETE(request: NextRequest) {
  const userId = owner(); if (!userId) return unauthorized();
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return NextResponse.json({ error: "Invalid origin." }, { status: 403 });
  const id = request.nextUrl.searchParams.get("id");
  if (!id || !/^[a-f0-9-]{36}$/.test(id)) return NextResponse.json({ error: "Invalid plan ID." }, { status: 400 });
  try { await mutatePlan(userId, id); return NextResponse.json({ deleted: true }); } catch { return unavailable(); }
}
