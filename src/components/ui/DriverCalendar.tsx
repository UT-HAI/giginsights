"use client";
import moment from 'moment';

import ScrollCalendar from '@/components/calendar/index'
import "@/components/calendar/styles/styles.css"; // only needs to be imported once

import ScrollAreaButtons from "@/components/ui/ScrollArea"

// Render the Calendar

import DaySummary from "@/app/calendar/types";

export default function DriverCalendar({
  data,
}: {
  data: Record<string, DaySummary>;
}) {

const dates = Object.keys(data).sort();
const firstDate = dates[0];

  return (
    <ScrollAreaButtons content = {<ScrollCalendar data={data} minDate={moment(firstDate).subtract(2, 'M')} maxDate={moment()}></ScrollCalendar>}>
    </ScrollAreaButtons>
  );
}
