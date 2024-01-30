"use client";

import Image from "next/image";
import Link from "next/link";

export default function Page() {
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

        <button className="w-72 h-9 bg-stone-800 rounded text-white cursor-pointer mb-6">
          Update My Driver Profile
        </button>

        <button className="w-72 h-9 bg-stone-800 rounded text-white cursor-pointer mb-6">
          Upload quest data
        </button>

        <button className="w-72 h-9 bg-stone-800 rounded text-white cursor-pointer mb-6">
          Check trip data
        </button>
      </div>
    </div>
  );
}
