import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function getGroqChatCompletion(prompt: string) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "llama3-8b-8192",
  });
}

// fetch ideas action
export async function getSaasIdeas(keyword: string) {
  const prompt = `Generate five innovative SaaS startup ideas related to "${keyword}". Provide a brief description for each idea.`;

  const response = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "llama3-8b-8192",
  });

  const content = response.choices[0]?.message?.content || "";
  const ideas = parseIdeas(content);

  return ideas;
}

function parseIdeas(content: string) {
  // Parse the response content into an array of ideas
  const ideaRegex = /\d+\.\s*(.*?):\s*(.*)/g;
  const ideas = [];
  let match;

  while ((match = ideaRegex.exec(content)) !== null) {
    ideas.push({
      title: match[1].trim(),
      description: match[2].trim(),
    });
  }

  return ideas;
}
