"use client";

const Info = () => {
  return (
    <div className="container mx-auto p-5">
      <div className="flex flex-col gap-8 items-center">
        <h1 className="text-3xl font-black">What will I get?</h1>

        <div className="w-full md:w-[450px] p-5 bg-blue-100 rounded-lg shadow-md">
          <h1 className="text-blue-800 font-semibold">
            1. Access free micro saas ideas instantly
          </h1>
          <h2 className="text-blue-600">
            Simply enter your niche and receive 10 FREE micro saas ideas
            tailored to your interests.
          </h2>
        </div>

        <div className="w-full md:w-[450px] p-5 bg-green-100 rounded-lg shadow-md">
          <h1 className="text-green-800 font-semibold">
            2. Evaluate ideas for their SEO potential
          </h1>
          <h2 className="text-green-600">
            Use 3 free credits to get detailed SEO reports and check the
            potential of your chosen micro saas ideas.
          </h2>
        </div>

        <div className="w-full md:w-[450px] p-5 bg-yellow-100 rounded-lg shadow-md">
          <h1 className="text-yellow-800 font-semibold">
            3. Discover high-value keywords for your ideas
          </h1>
          <h2 className="text-yellow-600">
            Get keyword suggestions to help you rank on Google, including
            insights on difficulty, volume, and trends.
          </h2>
        </div>
      </div>

      <div className="flex flex-col items-center mt-8">
        <h1 className="text-xl font-semibold text-center mb-5">
          Don’t waste time building products nobody wants. Find viable ideas
          that customers are actively searching for.
        </h1>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="bg-gray-100 p-5 rounded-lg shadow-md w-full md:w-1/2">
            <h2 className="text-xl font-semibold mb-3">Before</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Hours spent brainstorming new startup ideas.</li>
              <li>Excitement over potential new ventures.</li>
              <li>Launching products only to find minimal interest.</li>
              <li>Facing setbacks and starting the process again.</li>
            </ul>
          </div>

          <div className="bg-gray-100 p-5 rounded-lg shadow-md w-full md:w-1/2">
            <h2 className="text-xl font-semibold mb-3">After</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>
                Generate new startup ideas effortlessly with Find Micro Saas
                Ideas.
              </li>
              <li>
                Validate your ideas instantly with comprehensive SEO reports.
              </li>
              <li>
                Identify ideas with strong SEO potential and pursue them
                confidently.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
