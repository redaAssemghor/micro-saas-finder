"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth, UserButton, SignInButton } from "@clerk/nextjs";
import Button from "./ui/HeaderButton";

const Header = () => {
  const { userId } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log(isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-[--dark-blue] shadow-md lg:px-40 p-3">
      <div className="flex justify-between items-center">
        <a href="/" className="flex items-center gap-4">
          <Image
            src="/logo.webp"
            alt="Home"
            width={60}
            height={60}
            className="rounded-xl"
          />
          <span className="text-lg hidden lg:block font-semibold text-white">
            Find Micro Saas Ideas
          </span>
        </a>
        <nav className="lg:flex gap-4 hidden">
          <Link href="/newsletter">
            <Button text={"News Letter"} />
          </Link>

          {userId ? (
            <UserButton />
          ) : (
            <SignInButton>
              <button>
                <Button text={"Sign In"} />
              </button>
            </SignInButton>
          )}
        </nav>
        <Checkbox toggleMenu={toggleMenu} />
      </div>
      {isMenuOpen && <MobileMenu userId={userId} />}
    </header>
  );
};

type MobileMenuProps = {
  userId: string | null | undefined;
};

const MobileMenu = ({ userId }: MobileMenuProps) => {
  return (
    <div className="absolute top-0 left-0">
      <div className="h-screen w-screen flex justify-center items-center flex-col gap-4 bg-[--dark] bg-opacity-20">
        {userId ? (
          <UserButton />
        ) : (
          <SignInButton>
            <button>
              <Button text={"Sign In"} />
            </button>
          </SignInButton>
        )}
        <Link href="/newsletter">
          <Button text={"News Letter"} />
        </Link>
      </div>
    </div>
  );
};

type CheckboxProps = {
  toggleMenu: () => void;
};

const Checkbox = ({ toggleMenu }: CheckboxProps) => {
  return (
    <label className="lg:hidden flex flex-col gap-2 w-8 z-50">
      <input className="peer hidden" type="checkbox" onChange={toggleMenu} />
      <div className="rounded-2xl h-[3px] w-1/2 bg-black duration-500 peer-checked:rotate-[225deg] origin-right peer-checked:-translate-x-[12px] peer-checked:-translate-y-[1px]" />
      <div className="rounded-2xl h-[3px] w-full bg-black duration-500 peer-checked:-rotate-45" />
      <div className="rounded-2xl h-[3px] w-1/2 bg-black duration-500 place-self-end peer-checked:rotate-[225deg] origin-left peer-checked:translate-x-[12px] peer-checked:translate-y-[1px]" />
    </label>
  );
};

export default Header;
