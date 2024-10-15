import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get("keyword") || "email marketing";
  const country = searchParams.get("country") || "in";

  const apiKey = process.env.RAPIDAPI_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "RAPIDAPI_KEY is not set in environment variables." },
      { status: 500 }
    );
  }

  const apiUrl = `https://seo-keyword-research.p.rapidapi.com/keynew.php?keyword=${encodeURIComponent(
    keyword
  )}&country=${encodeURIComponent(country)}`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "seo-keyword-research.p.rapidapi.com",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `API request failed: ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: `An error occurred: ${error.message}` },
      { status: 500 }
    );
  }
}
