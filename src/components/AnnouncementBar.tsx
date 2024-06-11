"use client";
import Link from "next/link";

const AnnouncementBar = () => {
  return (
    <div className="bg-blue-500 text-white p-4 text-center">
      <h1>
        Click{" "}
        <Link href="/access" className="text-yellow-300 underline">
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
