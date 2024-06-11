"use client";
import Link from "next/link";
import { FaBell } from "react-icons/fa";

const AnnouncementBar = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 text-center flex items-center justify-center">
      <FaBell className="text-2xl mr-2" />
      <h1>
        Click{" "}
        <Link href="/newsletter" className="text-yellow-300 underline">
          here
        </Link>{" "}
        to get access to{" "}
        <span className="font-bold underline">80+ Micro Saas Ideas</span> with
        proven SEO Potential
      </h1>
    </div>
  );
};

export default AnnouncementBar;
