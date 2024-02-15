"use client";

import { NavigationIconLink } from "@/app/components/NavigationIconLink";

export default function Page() {
  const handleSubmit = async (event: any) => {
    event.preventDefault(); // Prevent default form submission behavior

    const formData = new FormData(event.target); // Create FormData object from the form
    const data = Object.fromEntries(formData); // Convert to a plain object

    try {
      const response = await fetch("/api/profile", {
        // Your API endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Convert data to JSON
      });
      if (!response.ok) throw new Error("Network response was not ok");
      console.log("updated");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col pl-6 pt-6">
        <NavigationIconLink href="/profile" />

        {/* Regular Login */}
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
          ></input>

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
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="none">Prefer not to self-describe</option>
          </select>

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
          >
            <option value="white">White</option>
            <option value="black">Black or African American</option>
            <option value="indian">American Indian or Alaska Native</option>
            <option value="asian">Asian</option>
            <option value="hawaiian">
              Native Hawaiian or Other Pacific Islander
            </option>
            <option value="two">Two or more race listed here</option>
            <option value="not">A race not listed here</option>
            <option value="noanswer">Prefer not to answer</option>
          </select>

          <fieldset className="mb-4" name="ethnicity">
            <legend className="text-stone-800 text-sm font-normal font-['Inter'] mb-2">
              Do you identify as Hispanic or Latino?
            </legend>
            <label className="inline-flex items-center">
              <input type="radio" name="ethnicity" value="Hispanic or Latino" />
              <span className="ml-2 text-sm">Hispanic or Latino</span>
            </label>
            <br />
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="ethnicity"
                value="Not Hispanic or Latino"
              />
              <span className="ml-2 text-sm">Not Hispanic or Latino</span>
            </label>
            <br />
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="ethnicity"
                value="Prefer not to answer"
              />
              <span className="ml-2 text-sm">Prefer not to answer</span>
            </label>
          </fieldset>

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
          >
            <option value="Below $25,000">Below $25,000</option>
            <option value="$25,001 - $49,999">$25,001 - $49,999</option>
            <option value="$50,000 - $74,999">$50,000 - $74,999</option>
            <option value="$75,000 - $99,999">$75,000 - $99,999</option>
            <option value="$100,000 - $149,999">$100,000 - $149,999</option>
            <option value="$150,000 and above">$150,000 and above</option>
            <option value="Prefer not to answer">Prefer not to answer</option>
          </select>

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
