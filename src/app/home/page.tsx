"use client";

import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function Page() {
  const handleSignOut = (e: any) => {
    e.preventDefault(); // Prevent the default anchor link behavior
    signOut({ callbackUrl: "/" }); // Redirect to home page after sign out
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col pl-6 pt-6">
        <Link className="mb-2" href="/">
          <Image
            height="15"
            width="15"
            src={"/leftArrow.svg"}
            alt={"leftArrow"}
          ></Image>
        </Link>

        <h1 className="text-stone-800 text-2xl font-semibold font-['Inter'] mb-6">
          Home
        </h1>

        <h2 className="text-stone-800 text-xl font-semibold font-['Inter'] mb-[12rem]">
          What would you like to do?
        </h2>

        <Link className="flex w-72 h-9 bg-stone-800 rounded text-white cursor-pointer mb-6 justify-center items-center" href="/profile">
          Update My Driver Profile
        </Link>

        <Link className="flex w-72 h-9 bg-stone-800 rounded text-white cursor-pointer mb-6 justify-center items-center" href="/quests">
          Upload quest data
        </Link>

        <Link className="flex w-72 h-9 bg-stone-800 rounded text-white cursor-pointer mb-6 justify-center items-center" href="/trips">
          Check trip data
        </Link>

        <a
          href="#"
          onClick={handleSignOut}
          className="underline hover:no-underline text-center text-stone-800 text-base font-normal font-['Inter'] cursor-pointer"
        >
          Logout
        </a>
      </div>
    </div>
  );
}
