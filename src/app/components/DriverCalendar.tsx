"use client"

import { DayContent, DayContentProps, DayPicker } from 'react-day-picker';
import { Calendar } from "@/components/ui/calendar";

export default function DriverCalendar({ data }: { data: Array<any> }) {
  console.log(data)
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col pl-6 pt-6">
        <h1 className="text-stone-800 text-2xl font-semibold font-['Inter'] mb-6">
          Calendar
        </h1>
        <Calendar ></Calendar>
      </div>
    </div>
  );

}
