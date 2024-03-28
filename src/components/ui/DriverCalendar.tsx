"use client";
import React, { Component } from 'react';
import moment from 'moment';

import ScrollCalendar from '@/components/calendar/index'
import "@/components/calendar/styles/styles.css"; // only needs to be imported once

import { ScrollArea } from "@/components/ui/scroll-area"

// Render the Calendar


import { DayContent, DayContentProps } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format } from "date-fns";
import DaySummary from "@/app/calendar/types";

export default function DriverCalendar({
  data,
}: {
  data: Record<string, DaySummary>;
}) {

  return (
    <ScrollArea className="h-[600px] w-[600px] rounded-md border p-4">
      <ScrollCalendar data={data}></ScrollCalendar>
    </ScrollArea>
  );
}
