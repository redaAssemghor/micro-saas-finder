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
      <div>
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-center p-6 bg-[--yallow] text-lg text-gray-500">
            ideas for the niche:{" "}
            <span className="text-[--dark-blue] font-semibold">
              {nicheSlice}
            </span>{" "}
          </h1>
          {ideas.length > 0 && (
            <div className="flex flex-col lg:grid grid-cols-3 gap-10">
              {ideas.map((idea, i) => (
                <Card
                  key={i}
                  name={idea.title}
                  description={idea.description}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Results;
