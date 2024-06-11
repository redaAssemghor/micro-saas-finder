"use client";
import { FaCheckCircle } from "react-icons/fa";
import { FaCheckSquare } from "react-icons/fa";

const Payment = () => {
  return (
    <div className="container mx-auto p-5 flex flex-col items-center bg-white py-32 text-gray-500">
      <div className="mb-8 text-center">
        <h1 className="font-bold mb-2">PRICING</h1>
        <h1 className="text-xl md:text-4xl text-yellow-500 font-black leading-tight mb-4">
          The easiest way to find
          <span className="text-blue-950 block">
            profitable Micro Saas Ideas
          </span>
        </h1>
      </div>

      {/* Payment Options */}
      <div className="flex flex-col md:flex-row gap-8 justify-center items-start mb-8">
        {/* 40 Credits Card */}
        <div className="w-full md:w-1/2 p-5 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-black">40 credits</h2>
          <p className="text-gray-600 mb-4 font-semibold text-lg">
            40 chances to find your next profitable Micro Saas Idea
          </p>
          <div className="flex items-baseline mb-4">
            <span className="text-3xl font-bold">$15</span>
            <span className="line-through text-gray-500 ml-2">$25</span>
            <span className="ml-2 text-gray-600">USD</span>
          </div>
          <ul className="space-y-2 text-gray-600 mb-4">
            <li className="flex items-center">
              <FaCheckCircle className="text-blue-600 mr-2 text-lg" />
              Get FREE Micro Saas Ideas
            </li>
            <li className="flex items-center">
              <FaCheckCircle className="text-blue-600 mr-2 text-lg" />
              Choose an idea to see if it has potential
            </li>
            <li className="flex items-center">
              <FaCheckCircle className="text-blue-600 mr-2 text-lg" />
              Find out the Keyword Difficulty for the keywords
            </li>
            <li className="flex items-center">
              <FaCheckCircle className="text-blue-600 mr-2 text-lg" />
              Find out the search volume for the keywords
            </li>
            <li className="flex items-center">
              <FaCheckCircle className="text-blue-600 mr-2 text-lg" />
              View Trend Analysis for the keywords
            </li>
            <li className="flex items-center">
              <FaCheckCircle className="text-blue-600 mr-2 text-lg" />
              Save Micro Saas Ideas and SEO Reports to your Dashboard
            </li>
          </ul>
          <div className="flex flex-col items-center">
            <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 mb-2 w-full">
              Find Startup Ideas
            </button>
            <h6 className="text-gray-400 text-sm">One time payment.</h6>
          </div>
        </div>

        {/* 100 Credits Card */}
        <div className="w-full md:w-1/2 p-5 bg-blue-100 rounded-lg shadow-lg relative">
          <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs px-2 py-1 rounded-bl-lg">
            POPULAR
          </div>
          <h2 className="text-2xl font-bold text-blue-800 mb-2">100 credits</h2>
          <p className="text-gray-600 mb-4">
            Need more credits? Get 100 credits for a better price
          </p>
          <div className="flex items-baseline mb-4">
            <span className="text-3xl font-bold">$29</span>
            <span className="line-through text-gray-500 ml-2">$39</span>
            <span className="ml-2 text-gray-600">USD</span>
          </div>
          <ul className="space-y-2 text-gray-600 mb-4">
            <li className="flex items-center">
              <FaCheckCircle className="text-blue-600 mr-2 text-lg" />
              Get FREE Micro Saas Ideas
            </li>
            <li className="flex items-center">
              <FaCheckCircle className="text-blue-600 mr-2 text-lg" />
              Choose an idea to see if it has potential
            </li>
            <li className="flex items-center">
              <FaCheckCircle className="text-blue-600 mr-2 text-lg" />
              Find out the Keyword Difficulty for the keywords
            </li>
            <li className="flex items-center">
              <FaCheckCircle className="text-blue-600 mr-2 text-lg" />
              Find out the search volume for the keywords
            </li>
            <li className="flex items-center">
              <FaCheckCircle className="text-blue-600 mr-2 text-lg" />
              View Trend Analysis for the keywords
            </li>
            <li className="flex items-center">
              <FaCheckCircle className="text-blue-600 mr-2 text-lg" />
              Save Micro Saas Ideas and SEO Reports to your Dashboard
            </li>
          </ul>
          <div className="flex flex-col items-center">
            <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 mb-2 w-full">
              Find Startup Ideas
            </button>
            <h6 className="text-gray-400 text-sm">One time payment.</h6>
          </div>
        </div>
      </div>

      {/* Target Audience Section */}
      <div className=" p-5 ">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Who is it for?
        </h2>
        <ul className="space-y-2 text-gray-600">
          <li className="flex items-center">
            <FaCheckSquare className="text-green-600 mr-2 text-2xl" />
            Solopreneurs who are looking to find new startup ideas
          </li>
          <li className="flex items-center">
            <FaCheckSquare className="text-green-600 mr-2 text-2xl" />
            Makers and builders who need inspiration for new products
          </li>
          <li className="flex items-center">
            <FaCheckSquare className="text-green-600 mr-2 text-2xl" />
            Indie hackers sick of wasting time building the wrong products
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Payment;
