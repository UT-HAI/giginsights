"use client";

import { DayContent, DayContentProps } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format } from "date-fns";

export default function DriverCalendar({
  data,
}: {
  data: Record<string, any>;
}) {
  function calculateColor(fare: number): string {
    const maxFare = 500;
    const ratio = Math.min(fare, maxFare) / maxFare;
    const hue = 120; // Green hue starts at 120
    const saturation = 100 * ratio; // Saturation transition
    const lightness = 100 - 50 * ratio; // Lightness transition from white to green
    return `hsla(${hue}, ${saturation}%, ${lightness}%, 0.8)`; // With opacity
  }

  function DaySummary({ daySummary }: {daySummary: any}) {
    return (
      <div className="text-sm">
        <p>
          Avg Distance:{" "}
          {(daySummary["sumDistances"] / daySummary["numberOfTrips"]).toFixed(
            2,
          )}{" "}
          Mi.
        </p>
        <p>Total Fares: ${daySummary["sumFares"].toFixed(2)}</p>
        <p>
          Avg Duration:{" "}
          {(
            daySummary["sumDurations"] /
            daySummary["numberOfTrips"] /
            60
          ).toFixed(2)}{" "}
          Mins
        </p>
        <p>Number of Trips: {daySummary["numberOfTrips"]}</p>
      </div>
    );
  }

  function DateTime(props: DayContentProps) {
    const dateTime: string = format(props.date, "yyyy-MM-dd");
    const daySummary = data[dateTime];
    const backgroundColor = daySummary
      ? calculateColor(daySummary["sumFares"])
      : "transparent";

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <time
              dateTime={dateTime}
              style={{
                backgroundColor,
                width: "50px",
                height: "50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              className="inline-block p-4 rounded"
            >
              <DayContent {...props} />
            </time>
          </TooltipTrigger>
          <TooltipContent>
            {daySummary ? (
              <DaySummary daySummary={daySummary} />
            ) : (
              "No Rides Found"
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <Calendar
      components={{ DayContent: DateTime }}
      fixedWeeks
      showOutsideDays={false}
    />
  );
}
