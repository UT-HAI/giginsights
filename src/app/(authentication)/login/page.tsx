"use client";

import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function Page() {
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    // Here we call signIn with 'credentials' and pass username and password
    const result = await signIn("credentials", {
      redirect: true, // Set to true if you want to redirect to the specified callback URL on success
      email: email,
      password: password,
    });

    console.log(result);
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

        {/* Regular Login */}
        <h1 className="text-stone-800 text-xl font-semibold font-['Inter'] mb-6">
          Login
        </h1>
        <form className="flex flex-col" onSubmit={handleSubmit} method="get">
          <label
            className="text-stone-800 test-sm font-normal font-['Inter'] mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="p-3 w-72 h-9 rounded border border-stone-300 mb-4"
            id="email"
            type="text"
            placeholder="Email"
          ></input>

          <label
            className="text-stone-800 test-sm font-normal font-['Inter'] mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="p-3 w-72 h-9 rounded border border-stone-300 mb-4"
            id="password"
            type="password"
            placeholder="Password"
          ></input>

          <input
            className="w-72 h-9 bg-stone-800 rounded text-white cursor-pointer"
            type="submit"
            value="Submit"
          />
        </form>

        <Link
          className="text-stone-800 text-xs font-normal font-['Inter'] underline mt-2"
          href="/reset"
        >
          Forgot password
        </Link>

        {/* Signup/Login using Socials */}
        <div className="flex flex-col items-center mt-4">
          <p className="mb-2 text-stone-800 text-sm font-normal font-['Inter']">
            or
          </p>
          <p className="mt-2 mb-2 text-stone-800 text-sm font-normal font-['Inter']">
            Sign up using Socials
          </p>
          <div className="mt-2 flex flex-row">
            <div
              className="ml-2 mr-2 cursor-pointer"
              onClick={() => signIn("google")}
            >
              <Image
                src="/googleIcon.svg"
                width={50}
                height={50}
                alt="Google Icon"
              />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-stone-800 text-xs font-normal font-['Inter']">
              Don’t have an account?{" "}
            </span>
            <Link
              className="text-stone-800 text-xs font-normal font-['Inter'] underline"
              href="/register"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
