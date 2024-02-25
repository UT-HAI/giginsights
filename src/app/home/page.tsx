"use client";

import { signOut } from "next-auth/react";
import { ActionLink } from "../components/ActionLink";

export default function Page() {
  const handleSignOut = (e: any) => {
    e.preventDefault(); // Prevent the default anchor link behavior
    signOut({ callbackUrl: "/" }); // Redirect to home page after sign out
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col pl-6 pt-6">
        <h1 className="text-stone-800 text-2xl font-semibold font-['Inter'] mb-6">
          Home
        </h1>

        <h2 className="text-stone-800 text-xl font-semibold font-['Inter'] mb-[12rem]">
          What would you like to do?
        </h2>

        <ActionLink href={"/profile"} label={"Update My Driver Profile"} />
        <ActionLink href={"/quests"} label={"Upload Quest Data"} />
        <ActionLink href={"/trips"} label={"Check Trip Data"} />
        <ActionLink href={"/calendar"} label={"Check Daily Earnings"} />

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
