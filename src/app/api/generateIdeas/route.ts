import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    console.log("Received request:", req); // Log the request object for debugging

    const { niche } = await req.json();

    console.log("Niche:", niche); // Log the niche parameter for debugging

    const completion = await openai.completions.create({
      model: "text-davinci-003",
      prompt: `Generate micro SaaS ideas for the following niche: ${niche}`,
      max_tokens: 100,
      temperature: 0.7,
    });

    console.log("Completion:", completion); // Log the completion response for debugging

    return NextResponse.json({ response: completion.choices[0].text });
  } catch (error) {
    console.error("Error:", error); // Log the error for debugging

    return NextResponse.json(
      {
        error: "Failed to fetch response from GPT-3 API",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
