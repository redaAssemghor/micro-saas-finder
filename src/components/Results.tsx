"use client";
import Card from "@/components/ui/Card";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

type Idea = {
  title: string;
  description: string;
};

type ResultsProps = {
  ideas: Idea[];
};

const Results = ({ ideas }: ResultsProps) => {
  const ideasSlice = useSelector((state: RootState) => state.ideas.value);
  const nicheSlice = useSelector((state: RootState) => state.niche.value);

  return (
    <div className="flex flex-col items-center gap-12 lg:m-10 w-full justify-center">
      <div className="flex flex-col items-center gap-12">
        <h1 className="text-center p-6 bg-gradient-to-r from-pink-500 to-yellow-500 text-lg text-white rounded-md">
          ideas for the niche: <span className="font-bold">{nicheSlice}</span>{" "}
        </h1>
        {ideas.length > 0 && (
          <div className="flex flex-col lg:grid grid-cols-3 gap-10">
            {ideas.map((idea, i) => (
              <Card key={i} name={idea.title} description={idea.description} />
            ))}
          </div>
        )}
        <h1 className="text-center p-6 bg-gradient-to-r from-pink-500 to-yellow-500 text-lg text-white rounded-md">
          Step 2: Click a Cadrd and check it’s SEO potential
        </h1>
      </div>
    </div>
  );
};

export default Results;
