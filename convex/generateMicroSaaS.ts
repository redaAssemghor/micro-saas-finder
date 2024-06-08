import { action } from "./_generated/server";
import { v } from "convex/values";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateIdeas = action({
  args: { niche: v.string() },
  handler: async (_, args) => {
    const prompt = `Suggest some innovative SaaS ideas for the following niche: ${args.niche}`;

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],

      model: "gpt-3.5-turbo",
    });

    const ideas = completion.choices[0].message.content;
    return ideas;
  },
});
