"use client";
import { addIdea } from "@/store/features/ideasSlice";
import { RootState } from "@/store/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Results from "./Results";
import { setNicheSlice } from "@/store/features/nicheSlice";

type Idea = {
  title: string;
  description: string;
};

const FetchForm = () => {
  const [niche, setNiche] = useState("");
  const [ideas, setIdeas] = useState<Idea[]>([]);

  const [loading, setLoading] = useState(false);
  const [showCards, setShowCards] = useState(false);

  const dispatch = useDispatch();
  const ideasSlice = useSelector((state: RootState) => state.ideas.value);

  const getRandomNiche = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/get-random-niche", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: "give me a random niche in one word max",
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setNiche(data.content);
      dispatch(setNicheSlice(data.content));
    } catch (error) {
      console.error("Error fetching random niche:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchIdeas = async (keyword: string) => {
    try {
      const response = await fetch("/api/get-ideas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ keyword }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setIdeas(data.ideas);
      dispatch(addIdea(data.ideas));
      console.log("Ideas received from API:", data.ideas);

      console.log("Ideas array:", ideas);
    } catch (error) {
      console.error("Error fetching ideas:", error);
    } finally {
      setLoading(false);
      setShowCards(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!niche) {
      alert("Please enter a niche.");
      setLoading(false);
      return;
    }

    await fetchIdeas(niche);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
      <div className="flex flex-col items-center gap-6 pb-10">
        <h1 className="text-center text-5xl font-bold text-[--yallow]">
          Find Validated Micro Saas Ideas,
          <span className="text-[--dark-blue]">Get Customers on Autopilot</span>
        </h1>
        <p className="text-lg font-semibold text-gray-500">
          Choose an idea to see if people are already searching for a product
          like this online and find out how hard it would be to rank in the top
          10 on Google
        </p>
      </div>
      {ideas && ideas.length > 0 ? (
        <Results ideas={ideas} />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white shadow-lg rounded-lg p-6"
        >
          <h2 className="text-xl font-bold mb-4">
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
      )}
    </main>
  );
};

export default FetchForm;
