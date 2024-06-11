import { action } from "./_generated/server";
import { v } from "convex/values";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface GenerateIdeasArgs {
  niche: string;
}

interface Idea {
  title: string;
  description: string;
}

export const generateIdeas = action({
  args: { niche: v.string() },
  handler: async (_, args: GenerateIdeasArgs): Promise<Idea[]> => {
    const prompt = `Suggest some innovative SaaS ideas for the following niche: ${args.niche}. Provide each idea in the format: {"title": "Idea Title", "description": "Idea Description"} without including the words "Title:" or "Description:". Limit the description to around 100 tokens. Return the ideas as a JSON array.`;

    let ideasArray: Idea[] = [];
    const requiredIdeasCount = 8;

    while (ideasArray.length < requiredIdeasCount) {
      const completion = await openai.chat.completions.create({
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: prompt },
        ],
        model: "gpt-3.5-turbo",
        max_tokens: 400,
      });

      const ideas = completion.choices[0].message?.content;

      if (ideas) {
        try {
          const newIdeas: Idea[] = JSON.parse(ideas);
          ideasArray = ideasArray.concat(newIdeas);
        } catch (error) {
          console.error("Failed to parse JSON response from OpenAI:", error);
        }
      }
    }

    return ideasArray.slice(0, requiredIdeasCount);
  },
});
