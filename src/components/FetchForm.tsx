"use client";
import { addIdea } from "@/store/features/ideasSlice";
import { RootState } from "@/store/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Results from "./Results";
import { setNicheSlice } from "@/store/features/nicheSlice";
import Input from "./ui/Input";
import Button from "./ui/Button";

type Idea = {
  title: string;
  description: string;
};

const FetchForm = () => {
  const [niche, setNiche] = useState("");
  const [ideas, setIdeas] = useState<Idea[]>([]);

  const [nicheBtnLoading, setNicheBtnLoading] = useState(false);
  const [ideasBtnLoading, setIdeasBtnLoading] = useState(false);

  const dispatch = useDispatch();
  const ideasSlice = useSelector((state: RootState) => state.ideas.value);

  const getRandomNiche = async () => {
    setNicheBtnLoading(true);

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
      setNicheBtnLoading(false);
    }
  };

  const fetchIdeas = async (keyword: string) => {
    setIdeasBtnLoading(true);
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
      setIdeasBtnLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!niche) {
      alert("Please enter a niche.");
      return;
    }

    await fetchIdeas(niche);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[--dark-blue] p-5">
      <div className="flex flex-col items-center gap-6 pb-10">
        <h1 className="text-center lg:text-5xl text-xl font-bold text-[--yallow]">
          Find Validated Micro Saas Ideas,
          <span className="text-white">Get Customers on Autopilot</span>
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
          className="w-full max-w-2xl bg-[--dark] text-white shadow-lg rounded-lg lg:p-12 p-3"
        >
          <h2 className="text-xl font-bold mb-4">
            Step 1: Enter a niche or click random
          </h2>
          <Input setNiche={setNiche} niche={niche} />
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <Button
              loading={nicheBtnLoading}
              onclick={getRandomNiche}
              text={"Random Niche"}
              type={"button"}
            />
            <Button
              loading={ideasBtnLoading}
              type={"submit"}
              text={"Generate FREE Ideas"}
            />
          </div>
        </form>
      )}
    </main>
  );
};

export default FetchForm;
