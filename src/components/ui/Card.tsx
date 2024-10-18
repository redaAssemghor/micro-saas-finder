import Link from "next/link";

interface CardProps {
  name: string;
  description: string;
  handleClick: () => void;
}

const Card = ({ name, description, handleClick }: CardProps) => {
  return (
    <div className="group relative cursor-pointer overflow-hidden bg-white rounded-2xl px-6 pt-12 pb-10 shadow-2xl ring-1 ring-gray-900/5 transition-all duration-500 transform hover:scale-105 hover:shadow-3xl sm:mx-auto sm:max-w-sm sm:px-12">
      <span className="absolute top-0 left-0 z-0 h-32 w-32 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-75 transition-all duration-500 transform group-hover:scale-[20]" />
      <div className="relative z-10 mx-auto max-w-md">
        <span className="grid h-24 w-24 place-items-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500 transform group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-yellow-500">
          <svg
            className="h-12 w-12 text-white transition-all"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <div className="space-y-6 pt-6 text-base text-gray-700 transition-all duration-500 group-hover:text-white">
          <h1 className="font-bold text-xl">{name}</h1>
          <p className="font-medium">{description}</p>
        </div>
        <div className="pt-6 text-lg font-semibold leading-7">
          <button onClick={handleClick}>
            <Link href="#seo">
              <span className="text-purple-500 transition-all duration-500 group-hover:text-white ">
                Explore SEO potential{" "}
                <span className="font-black text-4xl align-sub">&rarr;</span>
              </span>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
