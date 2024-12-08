import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-stone-200 p-8 lg:p-0 lg:py-8 text-gray-700 lg:px-40">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start">
        <div className="max-w-[500px] mb-8 md:mb-0">
          <Link href="/" passHref>
            <span className="flex items-center gap-4 mb-4 cursor-pointer">
              <Image
                src="/logo.webp"
                alt="Home"
                width={60}
                height={60}
                className="rounded-xl"
              />
              <span className="text-base font-semibold text-gray-700">
                Find Micro Saas Ideas
              </span>
            </span>
          </Link>
          <p className="mb-4 text-sm">
            Find your next startup idea in minutes. Don’t waste time building
            products nobody wants. Find viable ideas that customers are already
            searching for ...
          </p>
          <h6 className="font-semibold text-sm">
            Copyright © 2024 - All rights reserved
          </h6>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div>
            <h2 className="text-base font-semibold mb-4">LINKS</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="mailto:assemghor.reda@gmail.com" passHref>
                  <span className="hover:text-blue-500 transition duration-300 cursor-pointer">
                    Support
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/blog" passHref>
                  <span className="hover:text-blue-500 transition duration-300 cursor-pointer">
                    Blog
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/ideas" passHref>
                  <span className="hover:text-blue-500 transition duration-300 cursor-pointer">
                    80+ Micro Saas Ideas
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-base font-semibold mb-4">LEGAL</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacyPolicy" passHref>
                  <span className="hover:text-blue-500 transition duration-300 cursor-pointer">
                    Terms of services
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/privacyPolicy" passHref>
                  <span className="hover:text-blue-500 transition duration-300 cursor-pointer">
                    Privacy policy
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-base font-semibold mb-4">MORE</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/starter-syrup" passHref>
                  <span className="hover:text-blue-500 transition duration-300 cursor-pointer">
                    StarterSyrup
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/branding-kit" passHref>
                  <span className="hover:text-blue-500 transition duration-300 cursor-pointer">
                    Product Name and Branding Kit Generator
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
