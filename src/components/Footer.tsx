import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-stone-200 p-10 text-gray-700">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start">
        <div className="max-w-[500px] mb-8 md:mb-0">
          <a href="/" className="flex items-center gap-4 mb-4">
            <Image
              src="/logo.webp"
              alt="Home"
              width={60}
              height={60}
              className="rounded-xl"
            />
            <span className="text-lg font-semibold text-gray-700">
              Find Micro Saas Ideas
            </span>
          </a>
          <p className="mb-4">
            Find your next startup idea in minutes. Don’t waste time building
            products nobody wants. Find viable ideas that customers are already
            searching for ...
          </p>
          <h6 className="font-semibold">
            Copyright © 2024 - All rights reserved
          </h6>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div>
            <h2 className="text-lg font-semibold mb-4">LINKS</h2>
            <ul className="space-y-2">
              <li>
                <a
                  href=""
                  className="hover:text-blue-500 transition duration-300"
                >
                  Support
                </a>
              </li>
              <li>
                <a
                  href=""
                  className="hover:text-blue-500 transition duration-300"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href=""
                  className="hover:text-blue-500 transition duration-300"
                >
                  80+ Micro Saas Ideas
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">LEGAL</h2>
            <ul className="space-y-2">
              <li>
                <a
                  href=""
                  className="hover:text-blue-500 transition duration-300"
                >
                  Terms of services
                </a>
              </li>
              <li>
                <a
                  href=""
                  className="hover:text-blue-500 transition duration-300"
                >
                  Privacy policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">MORE</h2>
            <ul className="space-y-2">
              <li>
                <a
                  href=""
                  className="hover:text-blue-500 transition duration-300"
                >
                  StarterSyrup
                </a>
              </li>
              <li>
                <a
                  href=""
                  className="hover:text-blue-500 transition duration-300"
                >
                  Product Name and Branding Kit Generator
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
