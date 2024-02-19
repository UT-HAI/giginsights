"use client";

import Link from "next/link";
import { NavigationIconLink } from "../components/NavigationIconLink";
import { ActionLink } from "../components/ActionLink";
import { signOut } from "next-auth/react";

export default function Page() {
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col pl-6 pt-6">
        <NavigationIconLink href="/home" />

        <h1 className="text-stone-800 text-2xl font-semibold font-['Inter'] mb-6">
          Profile
        </h1>

        <h2 className="text-stone-800 text-xl font-semibold font-['Inter'] mb-[12rem]">
          What would you like to do?
        </h2>

        <ActionLink href="/profile/info" label="Update my Driver Information" />
        <ActionLink href="/profile/survey" label="Answer Driver Survey" />
        <ActionLink href="/reset" label="Change Password" />

        <a
          href="#"
          className="text-center text-stone-800 text-base font-normal font-['Inter'] cursor-pointer text-red-500/100"
        >
          Delete Account
        </a>
      </div>
    </div>
  );
}
