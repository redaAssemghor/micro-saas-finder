"use client";

import { useState } from "react";
import { useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import Info from "../components/Info";
import Payment from "@/components/Payment";
import Link from "next/link";
import Button from "@/components/Button";
import FAQ from "@/components/FAQ";

interface Idea {
  title: string;
  description: string;
}

export default function Home() {
  const [niche, setNiche] = useState("");
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(false);

  const generateIdeas = useAction(api.generateMicroSaaS.generateIdeas);
  const generateNiche = useAction(api.generateRandomNiche.generateNiche);

  const getRandomNiche = async () => {
    setLoading(true);
    try {
      const response = await generateNiche();
      if (typeof response === "string") {
        setNiche(response);
      } else {
        setNiche("");
      }
    } catch (error) {
      setNiche("");
    } finally {
      setLoading(false);
    }
    console.log(niche);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await generateIdeas({ niche });
      if (response && Array.isArray(response)) {
        setIdeas(response);
      } else {
        setIdeas([{ title: "No response received", description: "" }]);
      }
    } catch (error) {
      if (error instanceof Error) {
        setIdeas([{ title: `Error: ${error.message}`, description: "" }]);
      } else {
        setIdeas([{ title: "An unknown error occurred", description: "" }]);
      }
    } finally {
      setLoading(false);
    }
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
        <p className="text-xl text-gray-500 font-semibold my-8">
          The only tool you need to find your next startup idea that your
          customers are already looking for. Enter your niche and get 10 FREE
          Micro SaaS ideas.
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-lg rounded-lg p-6"
      >
        <h2 className="text-2xl font-semibold mb-4">
          Step 1: Enter a niche or click random
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
            onClick={getRandomNiche}
            className="w-full md:w-auto bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
            disabled={loading}
          >
            Random Niche
          </button>
          <button
            type="submit"
            className="w-full md:w-auto bg-green-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-600 transition duration-300"
            disabled={loading}
          >
            {loading ? "Loading..." : "Generate FREE Ideas"}
          </button>
        </div>
      </form>
      {ideas.length > 0 && (
        <div className="mt-8 w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {ideas.map((idea, i) => (
            <div
              key={i}
              className="bg-blue-100 shadow-lg rounded-lg p-6 hover:bg-blue-200 transition duration-300"
            >
              <h3 className="text-xl font-bold mb-2">{idea.title}</h3>
              <p className="whitespace-pre-wrap text-gray-700">
                {idea.description}
              </p>
            </div>
          ))}
        </div>
      )}
      <Info />
      <Payment />
      <Button />
      <FAQ />
    </main>
  );
}
