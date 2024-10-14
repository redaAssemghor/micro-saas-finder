"use client";
import Card from "@/components/ui/Card";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const Results = () => {
  const ideasSlice = useSelector((state: RootState) => state.ideas.value);
  const nicheSlice = useSelector((state: RootState) => state.niche.value);

  return (
    <div className="flex flex-col items-center gap-12 m-10 w-full h-screen justify-center">
      <div className="flex flex-col items-center gap-6">
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
      <div>
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-center p-6 bg-[--yallow] text-lg font-semibold">
            ideas for the niche: <span>{nicheSlice}</span>{" "}
          </h1>
          {ideasSlice.length > 0 && (
            <div className="flex flex-col lg:grid grid-cols-3 gap-10">
              {ideasSlice.map((idea, i) => (
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
