import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col items-center gap-5 bg-white p-8 rounded shadow-lg text-center">
        <FaExclamationTriangle className="text-yellow-500 text-6xl mb-4" />
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <p className="text-lg mb-4">Oops! Page not found.</p>
        <a href="/" className="text-blue-500 hover:underline">
          Go back to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
