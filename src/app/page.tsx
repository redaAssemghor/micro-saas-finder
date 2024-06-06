"use client";
import { useState } from "react";
import axios, { AxiosError } from "axios";

export default function Home() {
  const [niche, setNiche] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResponse("");
    try {
      const res = await axios.post(
        "/api/generateIdeas",
        { niche },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setResponse(res.data.response);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response && err.response.status === 429) {
          setError(
            "You have exceeded your quota. Please check your plan and billing details."
          );
        } else {
          setError("Error: Unable to fetch ideas from GPT-3 API");
        }
      } else {
        setError("An unexpected error occurred");
      }
      console.error("API Error:", err);
    }
  };

  const handleRandomNiche = () => {
    setNiche("indie hackers");
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
          value={niche}
          onChange={(e) => setNiche(e.target.value)}
          placeholder="e.g. indie hackers"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
        />
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <button
            type="button"
            onClick={handleRandomNiche}
            className="w-full md:w-auto bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Random Niche
          </button>
          <button
            type="submit"
            className="w-full md:w-auto bg-green-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Generate FREE Ideas
          </button>
        </div>
      </form>
      {response && (
        <div className="mt-8 w-full max-w-md bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Generated Ideas</h2>
          <p>{response}</p>
        </div>
      )}
      {error && (
        <div className="mt-8 w-full max-w-md bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Error</h2>
          <p>{error}</p>
        </div>
      )}
    </main>
  );
}
