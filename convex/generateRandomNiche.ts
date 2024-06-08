import { action } from "./_generated/server";
import { v } from "convex/values";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateNiche = action({
  handler: async () => {
    const prompt =
      "Generate a random tech niche . The name should be one to two words only.";

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],

      model: "gpt-3.5-turbo",
      max_tokens: 10,
    });

    const niche = completion.choices[0].message.content;

    const nicheWords =
      niche !== null && niche.split(/\s+/).slice(0, 2).join(" ");

    return nicheWords;
  },
});
