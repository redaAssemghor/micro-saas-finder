import { action } from "./_generated/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateNiche = action({
  handler: async () => {
    const prompt =
      "Generate a random niche. The name should be an abstruct field like 'crypto wallets', 'art', 'medicien' . Do not include quotation marks around the word.";

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
      model: "gpt-3.5-turbo",
      max_tokens: 10,
    });

    const message = completion.choices[0].message;

    if (message && message.content) {
      const niche = message.content.trim().replace(/^"|"$/g, ""); // Remove any surrounding quotes
      return niche;
    }

    return "No niche generated";
  },
});
