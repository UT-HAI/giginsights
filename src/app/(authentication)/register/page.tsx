"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { NavigationIconLink } from "@/components/ui/NavigationIconLink";
import { InputField } from "@/components/forms/InputField";
import { ErrorBar } from "@/components/ui/ErrorBar";

export default function Page() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

    // Form data to be sent
    const formData = new FormData(event.target as HTMLFormElement);
    const formProps = Object.fromEntries(formData);

    try {
      // Send form data to your API
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formProps),
      });

      if (!response.ok) {
        const result = await response.json();
        setErrors(result || {});
      } else {
        router.replace("/login");
      }
    } catch (error) {
      console.error(error);
      setErrors({ general: "An error occurred, please try again." });
    }
  };

  return (
    <div className="flex justify-center items-center">
      {/* Regular Sign up */}
      <div className="flex flex-col pl-6 pt-6">
        <NavigationIconLink href="/" />

        <h1 className="text-stone-800 text-xl font-semibold font-['Inter'] mb-6">
          New Account
        </h1>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <InputField
            id={"name"}
            type={"text"}
            placeholder={"Full name"}
            label={"Full Name"}
          />

          <ErrorBar error={errors.name} />

          <InputField
            id={"email"}
            type={"text"}
            placeholder={"Email"}
            label={"Email"}
          />

          <ErrorBar error={errors.email} />

          <InputField
            id={"password"}
            type={"password"}
            placeholder={"Password"}
            label={"Password"}
          />

          <ErrorBar error={errors.password} />

          <InputField
            id={"repassword"}
            type={"password"}
            placeholder={"Confirm Password"}
            label={"Confirm Password"}
          />

          <ErrorBar error={errors.repassword} />

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
