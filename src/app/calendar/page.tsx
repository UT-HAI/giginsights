import React from "react";
import {parseCSV, downloadFile } from "./utils";
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

  if (!fileData || !fileData.ride_data) {
    return <div>Something went wrong</div>;
  }

  const file = await downloadFile(fileData.ride_data);
  const summary = await parseCSV(file)

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col pl-6 pt-6">
        <h1 className="text-stone-800 text-2xl font-semibold font-['Inter'] mb-6 ml-6">
          Calendar
        </h1>
        <DriverCalendar data={summary}></DriverCalendar>
        <FileDropzone></FileDropzone>
      </div>
    </div>
  );
}
