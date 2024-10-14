import { useRef, useState } from "react";

interface Idea {
  title: string;
  description: string;
}

const FetchForm = () => {
  const [niche, setNiche] = useState("");
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(false);

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
    } catch (error) {
      console.error("Error fetching random niche:", error);
    }
  };

  const fetchIdeas = async (keyword: string) => {
    try {
      const response = await fetch("/api/get-ideas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ keyword: niche }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setIdeas(data.ideas);
      console.log("Ideas received from API:", data.ideas);
    } catch (error) {
      console.error("Error fetching ideas:", error);
    } finally {
      setLoading(false);
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
    fetchIdeas(niche);
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
        <p className=" text-gray-500 font-semibold my-8">
          The only tool you need to find your next startup idea that your
          customers are already looking for. Enter your niche and get 10 FREE
          Micro SaaS ideas.
        </p>
      </div>
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
    </main>
  );
};

export default FetchForm;
