"use client";
import Card from "@/components/ui/Card";
import { addIdea } from "@/store/features/singleIdeaSlice";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import FetchSeo from "./FetchSeo";
import Button from "./ui/Button";

type Idea = {
  title: string;
  description: string;
};

type ResultsProps = {
  ideas: Idea[];
  setIdeas: React.Dispatch<React.SetStateAction<Idea[]>>;
};

const Results = ({ ideas, setIdeas }: ResultsProps) => {
  const idea = useSelector((state: RootState) => state.singleIdea.value);
  const nicheSlice = useSelector((state: RootState) => state.niche.value);

  const dispatch = useDispatch();

  const handleClick = (title: string) => {
    dispatch(addIdea(title));
    console.log(idea);
  };

  return (
    <div className="flex flex-col items-center gap-12 lg:m-10 w-full justify-center">
      <div className="flex flex-col items-center gap-12">
        <h1 className="text-center p-6 bg-gradient-to-r from-pink-500 to-yellow-500 text-lg text-white rounded-md">
          Step 1 : ideas for the niche:{" "}
          <span className="font-bold">{nicheSlice}</span>{" "}
        </h1>
        <Button text="Restart" onclick={() => setIdeas([])} />
        {ideas.length > 0 && (
          <div className="flex flex-col lg:grid grid-cols-3 gap-10">
            {ideas.map((idea, i) => (
              <Card
                key={i}
                handleClick={() => handleClick(idea.title)}
                name={idea.title}
                description={idea.description}
              />
            ))}
          </div>
        )}
        <h1 className="text-center p-6 bg-gradient-to-r from-pink-500 to-yellow-500 text-lg text-white rounded-md">
          Step 2: Click on an idea to see if people are searching for it online
        </h1>
      </div>
      <FetchSeo />
    </div>
  );
};

export default Results;
