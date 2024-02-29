"use client";

import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { Separator } from "@/components/ui/separator";

function FileDropzone() {
  const [success, setSuccess] = useState<boolean>(false);
  // Handler for the form submission
  const handleSubmit = async (event: any) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const formData = new FormData(event.target); // Gather the form data

    // Perform the POST request using fetch API
    try {
      const response = await fetch("api/rideData", {
        method: "POST",
        body: formData, // Send the form data
      });

      // Check if the request was successful
      if (response.ok) {
        // Reload the page after successful submission
        setSuccess(true);
      } else {
        // Handle server errors or invalid responses
        alert("Failed to submit the form. Please try again.");
        setSuccess(false);
      }
    } catch (error) {
      // Handle network errors or issues with the fetch request
      console.error("Submission error:", error);
      alert("There was a problem with your submission. Please try again.");
    }
  };

  return (
    <form action="/storeCSV" onSubmit={handleSubmit}>
      <div className="mb-3 ml-6 mt-6">
        <label
          htmlFor="formFileMultiple"
          className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
        >
          Upload CSV File
        </label>
        <input
          className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
          type="file"
          id="formFileMultiple"
          name="file" // Ensure the file input has a name attribute for FormData to work
          accept=".csv, text/csv" // This line filters for CSV files only
        />
      </div>
      <div className="ml-6 flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 text-white bg-slate-500 rounded hover:bg-slate-700 focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </div>
      {success ? (
        <div className="flex flex-col">
          <Separator className="my-3"></Separator>
          <div className="flex flex-row justify-center">
            <div className="px-4 py-2 mr-4 text-sm text-green-800 rounded-lg bg-green-100 dark:bg-gray-800 dark:text-green-400">
              File Uploaded Successfully
            </div>
            <button
              className="ml-2 px-2 py-1 text-white bg-sky-400 rounded hover:bg-sky-700 focus:outline-none focus:shadow-outline"
              onClick={() => {
                window.location.reload();
              }}
            >
              <FontAwesomeIcon icon={faRefresh}></FontAwesomeIcon>
            </button>
          </div>
        </div>
      ) : (
        <div />
      )}
    </form>
  );
}

export default FileDropzone;
