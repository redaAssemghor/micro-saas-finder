"use client";
import { addIdea } from "@/store/features/ideasSlice";
import { RootState } from "@/store/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Results from "./Results";
import { setNicheSlice } from "@/store/features/nicheSlice";
import Input from "./ui/Input";
import Button from "./ui/Button";
import Loader from "./ui/Loading";

type Idea = {
  title: string;
  description: string;
};

const FetchForm = () => {
  const [niche, setNiche] = useState("");
  const [ideas, setIdeas] = useState<Idea[]>([
    {
      title: "AppShield Pro",
      description:
        "This SaaS startup provides a comprehensive mobile app security platform that enables developers to scan, analyze, and remediate vulnerabilities in real-time, offering real-time threat detection, custom threat modeling, and automated pen-testing tools.",
    },
    {
      title: "Cybesecur",
      description:
        "Focusing on the growing concern of API security, Cybesecur offers a comprehensive API protection solution, helping enterprises protect their APIs from fraud, hacking, and data breaches by providing real-time API threat detection, rate limiting, and real-time analytics.",
    },
    {
      title: "SecureZone",
      description:
        "SecureZone is a secure storage and sharing platform that allows mobile app developers to securely store and share sensitive data and credentials, providing an additional layer of security and compliance for app development and deployment.",
    },
    {
      title: "Mobiledetect",
      description:
        "Leveraging AI-powered threat detection, Mobiledetect identifies and blocks mobile malware and malicious files, offering a cloud-based antivirus and anti-malware solution that enhances app security and protects user data.",
    },
    {
      title: "AppGuard",
      description:
        "AppGuard is a cutting-edge mobile app security solution that combines machine learning-based threat detection with dynamic analysis and behavioral analysis to identify and prevent app-based attacks, offering a comprehensive endpoint security solution for mobile devices.",
    },
    {
      title: "SafeCode",
      description:
        "SafeCode provides a unique code analysis solution that detects and prevents common coding errors and vulnerabilities in mobile app code, identifying and fixing issues before they become security risk, using AI-powered code review and analysis.",
    },
  ]);

  const [nicheBtnLoading, setNicheBtnLoading] = useState(false);
  const [ideasBtnLoading, setIdeasBtnLoading] = useState(false);

  const dispatch = useDispatch();
  const ideasSlice = useSelector((state: RootState) => state.ideas.value);
  const singleIdea = useSelector((state: RootState) => state.singleIdea.value);

  const getRandomNiche = async () => {
    setNicheBtnLoading(true);

    try {
      const response = await fetch("/api/get-random-niche", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt:
            "Provide a tech-related niche in three words or fewer. Only output the idea itself, with no additional text or special characters.",
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
    <main className="flex flex-col items-center min-h-screen bg-[--dark-blue] p-5">
      <div className="flex flex-col items-center gap-6 py-14">
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
      <div>
        {ideas && ideas.length > 0 ? (
          <Results ideas={ideas} setIdeas={setIdeas} />
        ) : (
          <div>
            {ideasBtnLoading ? (
              <Loader />
            ) : (
              <form
                onSubmit={handleSubmit}
                className="lg:w-[700px] max-w-2xl bg-[--dark] text-white shadow-lg rounded-lg lg:p-12 p-3"
              >
                <h2 className="text-xl font-bold mb-4">
                  Step 1: Enter a niche or click random
                </h2>
                <Input setNiche={setNiche} niche={niche} />
                <div className="flex flex-col md:flex-row w-full justify-between gap-4">
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
          </div>
        )}
      </div>
    </main>
  );
};

export default FetchForm;
