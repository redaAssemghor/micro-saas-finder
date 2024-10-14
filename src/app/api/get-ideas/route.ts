import { NextRequest, NextResponse } from "next/server";
import { getSaasIdeas } from "@/app/lib/actions";

export async function POST(request: NextRequest) {
  try {
    const { keyword } = await request.json();

    if (!keyword) {
      return NextResponse.json(
        { error: "Keyword is required." },
        { status: 400 }
      );
    }

    const ideas = await getSaasIdeas(keyword);
    return NextResponse.json({ ideas });
  } catch (error) {
    console.error("Error generating SaaS ideas:", error);
    return NextResponse.json(
      { error: "Internal Server Error." },
      { status: 500 }
    );
  }
}
