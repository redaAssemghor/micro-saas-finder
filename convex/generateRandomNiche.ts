import { action } from "./_generated/server";
import { v } from "convex/values";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateNiche = action({
  handler: async () => {
    const prompt = "Generate a unique niche name for a tech SaaS.";

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],

      model: "gpt-3.5-turbo",
    });

    const niche = completion.choices[0].message.content;

    return niche;
  },
});
