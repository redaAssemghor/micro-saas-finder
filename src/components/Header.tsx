"use client";
import { useState } from "react";
import { FaEnvelope, FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";
import AnnouncementBar from "./AnnouncementBar";
import Link from "next/link";
import { useAuth, UserButton, SignInButton } from "@clerk/nextjs";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userId } = useAuth(); // Destructure userId from useAuth

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-stone-200 shadow-md">
      <div className="p-3">
        <div className="container mx-auto flex justify-between items-center">
          <a href="/" className="flex items-center gap-4">
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
          <nav className="hidden md:flex gap-4">
            <Link
              href="/newsletter"
              className="flex gap-2 items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
              aria-label="Newsletter"
            >
              <FaEnvelope className="text-xl" />
              <span>Newsletter</span>
            </Link>

            {userId ? (
              <div className="flex items-center bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 transition duration-300">
                <UserButton />
              </div>
            ) : (
              <Link
                href="/signin"
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
              >
                Sign in
              </Link>
            )}
          </nav>
          <button
            className="block md:hidden text-xl text-gray-700"
            onClick={toggleMenu}
            aria-label="Menu"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="fixed inset-0 bg-stone-200 flex flex-col items-center justify-center z-50">
            <button
              className="absolute top-5 right-5 text-xl text-gray-700"
              onClick={toggleMenu}
              aria-label="Close Menu"
            >
              <FaTimes />
            </button>
            <a
              href="/"
              className="flex items-center gap-4 mb-8"
              onClick={toggleMenu}
            >
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
            <nav className="flex flex-col gap-4">
              <a
                href="/newsletter"
                className="flex gap-2 items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                aria-label="Newsletter"
                onClick={toggleMenu}
              >
                <FaEnvelope className="text-xl" />
                <span>Newsletter</span>
              </a>
              {userId ? (
                <div className="flex items-center bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 transition duration-300">
                  <UserButton />
                </div>
              ) : (
                <Link
                  href="/signin"
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
      <AnnouncementBar />
    </header>
  );
};

export default Header;
