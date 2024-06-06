import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    console.log("Received request:", req);

    const body = await req.json();
    console.log("Request body:", body);

    const { niche } = body;
    if (!niche) {
      console.error("Niche is not provided");
      return NextResponse.json({ error: "Niche is required" }, { status: 400 });
    }

    console.log("Niche:", niche);

    const completion = await openai.completions.create({
      model: "gpt-3.5-turbo", // Use the supported model
      prompt: `Generate micro SaaS ideas for the following niche: ${niche}`,
      max_tokens: 100,
      temperature: 0.7,
    });

    console.log("Completion:", completion);

    return NextResponse.json({ response: completion.choices[0].text });
  } catch (err) {
    console.error("Error:", err);

    let statusCode = 500;
    let errorMessage = "Failed to fetch response from GPT-3 API";

    if (err instanceof Error && err.message.includes("429")) {
      statusCode = 429;
      errorMessage =
        "You have exceeded your quota. Please check your plan and billing details.";
    }

    return NextResponse.json(
      {
        error: errorMessage,
        details: err instanceof Error ? err.message : "Unknown error",
      },
      { status: statusCode }
    );
  }
}
