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
  } catch (error) {
    console.error("Error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch response from GPT-3 API",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
