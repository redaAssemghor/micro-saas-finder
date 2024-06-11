const Newsletter: React.FC = () => {
  return (
    <div className="h-screen justify-center flex flex-col items-center bg-gray-100 p-6 sm:p-12">
      <h1 className="lg:text-4xl text-slate-700 font-black text-center mb-4">
        Get Micro SaaS Ideas that your customers are already looking for
        straight to your inbox.
      </h1>
      <p className=" text-gray-500 text-center mb-8">
        Every week you’ll get a new startup idea with great potential that you
        can build and get customers on autopilot.{" "}
        <span className="font-semibold">
          Start earning money while you sleep.
        </span>
      </p>
      <div className="w-full max-w-md">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-lg border border-gray-300 mb-4 focus:outline-none focus:border-blue-500 transition duration-300"
        />
        <button className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition duration-300">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default Newsletter;
