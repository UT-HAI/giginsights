"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from 'next/navigation'

export default function Page() {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const router = useRouter()

  const handleSubmit = async (event: any) => {
    event.preventDefault(); // Prevent default form submission

    // Form data to be sent
    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);

    try {
      // Send form data to your API
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formProps),
      });

      if (!response.ok) {
        const result = await response.json();
        setErrors(result || {});
      } else {
        router.replace("/login")
      }
    } catch (error) {
      console.error(error);
      setErrors({ general: 'An error occurred, please try again.' });
    }
  };

  return (
    <div className="flex justify-center items-center">
      {/* Regular Sign up */}
      <div className="flex flex-col pl-6 pt-6">
        <Link className="mb-2" href="/">
          <Image
            height="15"
            width="15"
            src={"/leftArrow.svg"}
            alt={"leftArrow"}
          ></Image>
        </Link>
        <h1 className="text-stone-800 text-xl font-semibold font-['Inter'] mb-6">
          New Account
        </h1>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label
            className="text-stone-800 font-normal font-['Inter'] mb-2"
            htmlFor="name"
          >
            Full Name
          </label>
          <input
            className="p-3 w-72 h-9 rounded border border-stone-300 mb-2"
            id="name"
            name="name"
            type="text"
            placeholder="Full Name"
          ></input>

          <div className="text-red-500 mb-4 text-sm">
            {errors.name && <div className="error">{errors.name}</div>}
          </div>

          <label
            className="text-stone-800 font-normal font-['Inter'] mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="p-3 w-72 h-9 rounded border border-stone-300 mb-2"
            id="email"
            name="email"
            type="text"
            placeholder="Email"
          ></input>

          <div className="text-red-500 mb-4 text-sm">
            {errors.email && <div className="error">{errors.email}</div>}
          </div>

          <label
            className="text-stone-800 font-normal font-['Inter'] mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="p-3 w-72 h-9 rounded border border-stone-300 mb-2"
            id="password"
            name="password"
            type="password"
            placeholder="Password"
          ></input>

          <div className="text-red-500 mb-4 text-sm">
            {errors.password && <div className="error">{errors.password}</div>}
          </div>

          <label
            className="text-stone-800 font-normal font-['Inter'] mb-2"
            htmlFor="repassword"
          >
            Confirm Password
          </label>
          <input
            className="p-3 w-72 h-9 rounded border border-stone-300 mb-2"
            id="repassword"
            name="repassword"
            type="password"
            placeholder="Confirm Password"
          ></input>

          <div className="text-red-500 mb-4 text-sm">
            {errors.repassword && <div className="error">{errors.repassword}</div>}
          </div>

          <input
            className="w-72 h-9 bg-stone-800 rounded text-white cursor-pointer"
            type="submit"
            value="Submit"
          />
        </form>


        {/* Sign up using Socials */}
        <div className="flex flex-col items-center mt-4">
          <p className="mb-2 text-stone-800 text-sm font-normal font-['Inter']">
            or
          </p>
          <p className="mt-2 mb-2 text-stone-800 text-sm font-normal font-['Inter']">
            Sign up using Socials
          </p>
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
      </div>
    </div>
  );
}
