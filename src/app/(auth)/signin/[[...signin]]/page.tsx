// pages/signin.tsx

import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-center text-2xl font-bold mb-6 text-gray-700">
          Sign In
        </h1>
        <SignIn />
      </div>
    </div>
  );
};

export default SignInPage;
