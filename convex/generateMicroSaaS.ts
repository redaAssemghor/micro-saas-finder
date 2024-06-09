import { action } from "./_generated/server";
import { v } from "convex/values";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateIdeas = action({
  args: { niche: v.string() },
  handler: async (_, args) => {
    const prompt = `Suggest some innovative SaaS ideas for the following niche: ${args.niche}. Provide each idea with a title followed by a description, each limited to a maximum of 4 lines or around 100 tokens.`;

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
      model: "gpt-3.5-turbo",
      max_tokens: 400,
    });

    const ideas = completion.choices[0].message.content;

    const ideasArray = ideas
      ? ideas
          .split("\n\n") // Assuming each idea is separated by a double newline
          .map((idea) => {
            const [titlePart, ...descriptionParts] = idea.split("\n");
            const title = titlePart.replace(/^\d+\.\s*/, "").trim();
            const description = descriptionParts.join(" ").trim();
            return {
              title,
              description,
            };
          })
      : [];

    return ideasArray;
  },
});
