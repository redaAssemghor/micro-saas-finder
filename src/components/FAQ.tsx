import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is FindMicroSaasIdeas?",
    answer:
      "FindMicroSaasIdeas is a web-based application that allows you to find micro SaaS ideas for your niche. You can enter a niche and the application will generate 10 free micro SaaS ideas for you. You can then choose a micro SaaS idea and get a detailed SEO report for the idea to see if it's worth building.",
  },
  {
    question: "What happens when I click the Generate FREE Ideas button?",
    answer:
      "When you click this button our application will begin to generate your 10 free micro SaaS ideas. Once the ideas are generated the page will refresh and you will see the ideas displayed on the screen. From there you can choose an idea to get an SEO report to see the potential that the idea has.",
  },
  {
    question: "What does the SEO Report show?",
    answer:
      "Once you choose an idea you will see a detailed SEO report for the idea with keyword insights. This report will show you suggested keywords along with the keyword difficulty, search volume, and trend analysis. This will help you determine if the idea is worth building.",
  },
  {
    question: "Hold on, is this completely free?",
    answer:
      "Our application is completely 100% free to use. You can generate 10 free micro SaaS ideas whenever you want. However you only have 3 free credits to get an SEO report for an idea. If you want more credits you can purchase them on the pricing page.",
  },
  {
    question: "Why do I need an SEO Report?",
    answer:
      "The SEO report will help you determine if the idea you have chosen is worth building. It will show you keyword insights such as the keyword difficulty, search volume, and trend analysis for the idea. If you find an idea with a low keyword difficulty and a high search volume then you could be onto a winner!",
  },
  {
    question: "How can I get more credits?",
    answer:
      "If you want more credits you can purchase them on the pricing page. We offer a range of pricing plans to suit your needs. You can choose a plan that suits you and purchase it to get more credits.",
  },
  {
    question: "How can I report a bug or ask a question?",
    answer:
      "You can email us at tony@findmicrosaasideas.com! We would be happy to help you!",
  },
];

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center items-start sm:items-center sm:space-x-8 bg-gray-100 p-6 sm:p-12">
      <div className="w-full sm:w-1/3 mb-6 sm:mb-0">
        <h1 className="text-sm text-blue-500 font-bold mb-4">FAQ</h1>
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
      </div>
      <div className="w-full sm:w-2/3">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4 border-b-2 border-gray-200 pb-4">
            <div
              className={`flex justify-between items-center cursor-pointer ${
                activeIndex === index ? "text-blue-500" : ""
              }`}
              onClick={() => handleToggle(index)}
            >
              <h3 className="text-xl font-semibold transition-colors duration-300">
                {faq.question}
              </h3>
              <div className="text-xl">
                {activeIndex === index ? <FaMinus /> : <FaPlus />}
              </div>
            </div>
            <div
              className={`overflow-hidden transition-max-height duration-1000 ease-in-out ${
                activeIndex === index ? "max-h-96" : "max-h-0"
              }`}
            >
              <p className="mt-4 text-gray-700">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
