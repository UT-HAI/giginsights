"use client";

import { NavigationIconLink } from "@/app/components/NavigationIconLink";
import { useState } from "react";
import { ErrorBar } from "@/app/components/ErrorBar";

export default function Page() {
  // const prisma = new PrismaClient();

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState<boolean>(false);
  const [prepopulated, setPrepopulated] = useState<boolean>(false);
  const [prepopulatedData, setPrepopulatedData] = useState<
    Record<string, string>
  >({});

  const populateData = async () => {
    if (!prepopulated) {
      try {
        const response = await fetch("/api/profile/survey", {
          method: "GET",
        });
        const data = await response.json();
        setPrepopulatedData(data);
        setPrepopulated(true);
        console.log(data);
      } catch {}
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setPrepopulatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  populateData();

  const handleSubmit = async (event: any) => {
    event.preventDefault(); // Prevent default form submission behavior

    const formData = new FormData(event.target); // Create FormData object from the form
    const data = Object.fromEntries(formData); // Convert to a plain object

    try {
      const response = await fetch("/api/profile/survey", {
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
          Driver Survey
        </h1>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label
            className="text-stone-800 text-sm font-normal font-['Inter'] mb-2"
            htmlFor="age"
          >
            Age
          </label>
          <input
            className="p-3 w-72 h-9 text-sm rounded border border-stone-300 mb-4"
            id="age"
            name="age"
            type="text"
            placeholder="Age"
            value={prepopulatedData["age"] ?? ""}
            onChange={handleInputChange}
          ></input>

          <ErrorBar error={errors.age} />

          <label
            className="text-stone-800 text-sm font-normal font-['Inter'] mb-2"
            htmlFor="gender"
          >
            Gender
          </label>
          <select
            className="pl-3 w-72 h-9 text-sm rounded border border-stone-300 mb-4 bg-white"
            name="gender"
            id="gender"
            value={prepopulatedData["gender"] ?? ""}
            onChange={handleInputChange}
          >
            <option value="" disabled selected>
              Select your gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Prefer not to self-describe">
              Prefer not to self-describe
            </option>
          </select>

          <ErrorBar error={errors.gender} />

          <label
            className="text-stone-800 text-sm font-normal font-['Inter'] mb-2"
            htmlFor="race"
          >
            Race
          </label>
          <select
            className="pl-3 w-72 h-9 text-sm rounded border border-stone-300 mb-4 bg-white"
            name="race"
            id="race"
            value={prepopulatedData["race"] ?? ""}
            onChange={handleInputChange}
          >
            <option value="" disabled selected>
              Select your Race
            </option>
            <option value="White">White</option>
            <option value="Black or African American">
              Black or African American
            </option>
            <option value="American Indian or Alaska Native">
              American Indian or Alaska Native
            </option>
            <option value="Asian">Asian</option>
            <option value="Native Hawaiian or Other Pacific Islander">
              Native Hawaiian or Other Pacific Islander
            </option>
            <option value="Two or more race listed here">
              Two or more race listed here
            </option>
            <option value="A race not listed here">
              A race not listed here
            </option>
            <option value="Prefer not to answer">Prefer not to answer</option>
          </select>

          <ErrorBar error={errors.race} />

          <fieldset className="mb-4" name="ethnicity">
            <legend className="text-stone-800 text-sm font-normal font-['Inter'] mb-2">
              Do you identify as Hispanic or Latino?
            </legend>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="ethnicity"
                value="Hispanic or Latino"
                checked={prepopulatedData.ethnicity === "Hispanic or Latino"}
                onChange={handleInputChange}
              />
              <span className="ml-2 text-sm">Hispanic or Latino</span>
            </label>
            <br />
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="ethnicity"
                value="Not Hispanic or Latino"
                checked={
                  prepopulatedData.ethnicity === "Not Hispanic or Latino"
                }
                onChange={handleInputChange}
              />
              <span className="ml-2 text-sm">Not Hispanic or Latino</span>
            </label>
            <br />
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="ethnicity"
                value="Prefer not to answer"
                checked={prepopulatedData.ethnicity === "Prefer not to answer"}
                onChange={handleInputChange}
              />
              <span className="ml-2 text-sm">Prefer not to answer</span>
            </label>
          </fieldset>

          <ErrorBar error={errors.ethnicity} />

          <label
            className="text-stone-800 text-sm font-normal font-['Inter'] mb-2"
            htmlFor="income"
          >
            Income
          </label>
          <select
            className="pl-3 w-72 h-9 text-sm rounded border border-stone-300 mb-4 bg-white"
            name="income"
            id="income"
            value={prepopulatedData["income"] ?? ""}
            onChange={handleInputChange}
          >
            <option value="" disabled selected>
              Select your Income
            </option>
            <option value="Below $25,000">Below $25,000</option>
            <option value="$25,001 - $49,999">$25,001 - $49,999</option>
            <option value="$50,000 - $74,999">$50,000 - $74,999</option>
            <option value="$75,000 - $99,999">$75,000 - $99,999</option>
            <option value="$100,000 - $149,999">$100,000 - $149,999</option>
            <option value="$150,000 and above">$150,000 and above</option>
            <option value="Prefer not to answer">Prefer not to answer</option>
          </select>

          <ErrorBar error={errors.income} />

          <input
            className="w-72 h-9 bg-stone-800 rounded text-white cursor-pointer"
            type="submit"
            value="Submit"
          />
        </form>
        {success && (
          <div
            className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 mt-2"
            role="alert"
          >
            Data updated successfully
          </div>
        )}
      </div>
    </div>
  );
}
