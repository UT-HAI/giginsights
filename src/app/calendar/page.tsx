import React from "react";
import { parseCSV, downloadFile } from "./utils";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import DriverCalendar from "@/components/ui/DriverCalendar";
import FileDropzone from "@/components/forms/FileDropZone";

export default async function Page() {
  const session = await getServerSession();
  const email = session?.user?.email;

  if (!email) {
    return <div>Something went wrong</div>;
  }

  const prisma = new PrismaClient();
  const user = await prisma.users.findFirst({
    where: {
      email: email,
    },
  });

  if (!user) {
    return <div>Something went wrong</div>;
  }

  const fileData = await prisma.files.findFirst({
    where: {
      user_id: user.id,
    },
  });

  let summary = {};
  if (fileData && fileData.ride_data) {
    const file = await downloadFile(fileData.ride_data);
    summary = await parseCSV(file)
  }

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center pl-6 pt-6">
        <h1 className="text-stone-800 text-2xl font-semibold font-['Inter'] mb-6 ml-6">
          Earnings View
        </h1>
        <div className="w-[50rem] pb-8">
          Below, we have created a calendar from the work data you uploaded. The darker the color of a day, the more money you earn. Days that are white mean you either did not work that day, or you have not uploaded data for that day. If you hover over a day, you will also see the breakdown of how many miles you drove customers that day, and	 how many rides you began per hour of the day.
        </div>
        <DriverCalendar data={summary}></DriverCalendar>
        <FileDropzone></FileDropzone>
        <div className="w-[50rem] pb-[10rem] pt-5">
          Try creating a calendar view for a series of weeks or months that you remember being particularly busy:<br/><br/>
          1. Why did you select this day and time to create your calendar view?<br/><br/>
          2. Was there anything going on in your personal life in these times that affected your work patterns? Or did your work impact your personal life?<br/><br/>
          3. Do you remember this being a successful or challenging period of work?<br/><br/>
          4. What made it successful or challenging?<br/><br/>
          5. Are you willing to share this calendar (of these specific dates) and your answers above with policymakers and the general public to help them understand the gig work platform conditions that impact your work and well-being? Your identity will be anonymized, and the data used to create this will not be shared.
        </div>
      </div>
    </div>
  );
}
