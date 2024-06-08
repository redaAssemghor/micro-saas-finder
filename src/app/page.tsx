"use client";

import { useState } from "react";
import { useAction, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const [niche, setNiche] = useState("");
  const [ideas, setIdeas] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generateIdeas = useAction(api.generateMicroSaaS.generateIdeas);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await generateIdeas({ niche });
      if (response !== null) {
        setIdeas(response);
      } else {
        setIdeas(["No response received"]);
      }
    } catch (error) {
      if (error instanceof Error) {
        setIdeas([`Error: ${error.message}`]);
      } else {
        setIdeas(["An unknown error occurred"]);
      }
    }
    setLoading(false);
    console.log(ideas);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
      <div className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl text-yellow-500 font-black leading-tight mb-4">
          Find Validated Micro Saas Ideas,
          <span className="text-blue-950 block">
            Get Customers on Autopilot
          </span>
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-lg rounded-lg p-6"
      >
        <h2 className="text-2xl font-semibold mb-4">
          Step 1: Enter a niche or choose random
        </h2>
        <input
          type="text"
          placeholder="e.g. indie hackers"
          value={niche}
          onChange={(e) => setNiche(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
        />
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <button
            type="button"
            onClick={() => setNiche("random")}
            className="w-full md:w-auto bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Random Niche
          </button>
          <button
            type="submit"
            className="w-full md:w-auto bg-green-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-600 transition duration-300"
          >
            {loading ? "Loading..." : "Generate FREE Ideas"}
          </button>
        </div>
      </form>
      {ideas &&
        ideas.map((idea, i) => (
          <div
            key={i}
            className="mt-8 w-full max-w-md bg-white shadow-lg rounded-lg p-6"
          >
            <h2 className="text-2xl font-semibold mb-4">Generated Ideas</h2>
            <p className="whitespace-pre-wrap">{idea}</p>
          </div>
        ))}
    </main>
  );
}
