import { generateIdeas } from "../../convex/generateMicroSaaS";
import OpenAI from "openai";

jest.mock("openai", () => {
  return jest.fn().mockImplementation(() => {
    return {
      chat: {
        completions: {
          create: jest.fn(),
        },
      },
    };
  });
});

describe("generateIdeas", () => {
  it("should generate SaaS ideas for a given niche", async () => {
    const mockResponse = {
      choices: [
        {
          message: {
            content:
              "1. AI-Powered Project Management: A SaaS tool that uses AI to optimize project management workflows. Integrates with popular tools like Trello and Asana. Predicts project bottlenecks and suggests solutions. Includes automated reporting features.\n\n2. Personalized Learning Platform: An AI-driven learning platform that customizes courses based on user preferences and progress. Offers interactive lessons and real-time feedback. Includes gamification elements to enhance engagement. Provides comprehensive analytics for educators.",
          },
        },
      ],
    };

    const openaiInstance = new OpenAI();
    openaiInstance.chat.completions.create.mockResolvedValue(mockResponse);

    const args = { niche: "project management" };
    const result = await generateIdeas.handler(null, args);

    expect(result).toEqual([
      {
        title: "AI-Powered Project Management",
        description:
          "A SaaS tool that uses AI to optimize project management workflows. Integrates with popular tools like Trello and Asana. Predicts project bottlenecks and suggests solutions. Includes automated reporting features.",
      },
      {
        title: "Personalized Learning Platform",
        description:
          "An AI-driven learning platform that customizes courses based on user preferences and progress. Offers interactive lessons and real-time feedback. Includes gamification elements to enhance engagement. Provides comprehensive analytics for educators.",
      },
    ]);
  });
});
