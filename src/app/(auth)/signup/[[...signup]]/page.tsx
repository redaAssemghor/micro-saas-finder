import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-center text-2xl font-bold mb-6 text-gray-700">
          Sign Up
        </h1>
        <SignUp />
      </div>
    </div>
  );
};

export default SignUpPage;
