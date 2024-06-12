import React from "react";

interface ButtonProps {
  scrollToForm: () => void;
}

const Button: React.FC<ButtonProps> = ({ scrollToForm }) => {
  return (
    <div className="w-full min-h-screen inset-0 flex items-center justify-center bg-slate-700 text-center p-4 sm:p-8 z-10">
      <div className="text-white max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4">
          Find validated startup ideas in a couple of clicks
        </h1>
        <p className="text-sm sm:text-base md:text-lg mb-8">
          No more wasting time on building ideas that users don’t want
        </p>
        <button
          onClick={scrollToForm}
          className="bg-blue-500 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg hover:bg-blue-600 transition duration-300 text-base sm:text-lg md:text-xl"
        >
          Find StartUp ideas
        </button>
      </div>
    </div>
  );
};

export default Button;
