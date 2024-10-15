"use client";
import { useState } from "react";

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-1/2 flex flex-col items-center justify-center bg-gray-100 p-6 sm:p-12">
        <h1 className="lg:text-4xl text-slate-700 font-black text-center mb-4">
          Get Micro SaaS Ideas that your customers are already looking for
          straight to your inbox.
        </h1>
        <p className="text-gray-500 text-center mb-8">
          Every week you’ll get a new startup idea with great potential that you
          can build and get customers on autopilot.{" "}
          <span className="font-semibold">
            Start earning money while you sleep.
          </span>
        </p>
        {isSubmitted ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              Thank you for subscribing!
            </h2>
            <p className="text-gray-700">
              Check your inbox for the latest updates.
            </p>
          </div>
        ) : (
          <form className="w-full max-w-md" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-lg border border-gray-300 mb-4 focus:outline-none focus:border-blue-500 transition duration-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Newsletter;
