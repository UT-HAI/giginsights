"use client";

import { DynamicContractorJobs } from "@/components/forms/DynamicContractorJobs";
import { DynamicGigAppJobs } from "@/components/forms/DynamicGigAppJobs";
import { DynamicW2Jobs } from "@/components/forms/DynamicW2Jobs";
import { SelectCities } from "@/components/forms/SelectCities";
import { NavigationIconLink } from "@/components/ui/NavigationIconLink";
import { useState } from "react";

export default function Page() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior

    const formData = new FormData(event.target as HTMLFormElement); // Create FormData object from the form
    const data = Object.fromEntries(formData); // Convert to a plain object

    try {
      const response = await fetch("/api/profile/info", {
        // Your API endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Convert data to JSON
      });
      if (!response.ok) {
        const result = await response.json();
        setErrors(result || {});
        setSuccess(false);
      } else {
        setSuccess(true);
        setErrors({});
      }
    } catch (error) {
      console.log(error);
      setErrors({ general: "An error occurred, please try again." });
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col pl-6 pt-6">
        <NavigationIconLink href="/profile" />

        <h1 className="text-stone-800 text-xl font-semibold font-['Inter'] mb-6">
          Driver Information
        </h1>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label
            className="text-stone-800 text-sm font-normal font-['Inter'] mb-2"
            htmlFor="rating"
          >
            What is your Uber rating?
          </label>
          <input
            className="p-3 w-72 h-9 text-sm rounded border border-stone-300 mb-4"
            id="rating"
            name="rating"
            type="text"
            placeholder="Rating"
          ></input>

          <SelectCities />

          <DynamicGigAppJobs />
          <DynamicContractorJobs />
          <DynamicW2Jobs />

          <input
            className="w-72 h-9 bg-stone-800 rounded text-white cursor-pointer"
            type="submit"
            value="Submit"
          />
        </form>
      </div>
    </div>
  );
}
