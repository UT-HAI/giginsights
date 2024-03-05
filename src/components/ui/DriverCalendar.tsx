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
import DaySummary from "@/app/calendar/types";

export default function DriverCalendar({
  data,
}: {
  data: Record<string, DaySummary>;
}) {

  function calculateColor(fare: number): string {
    const maxFare = 500;
    const ratio = Math.min(fare, maxFare) / maxFare;
    const hue = 120; // Green hue starts at 120
    const saturation = 100 * ratio; // Saturation transition
    const lightness = 100 - 50 * ratio; // Lightness transition from white to green
    return `hsla(${hue}, ${saturation}%, ${lightness}%, 0.8)`; // With opacity
  }

  function DaySummaryComponent({ daySummary }: { daySummary: DaySummary }) {
    return (
      <div className="text-sm flex flex-col items-start">
        <p>Trips: <b>{daySummary["numberOfTrips"]}</b> trips</p>
        <p>Earnings: <b>${daySummary["sumFares"].toFixed(2)}</b></p>
        <p>Time driving passengers: <b>{(daySummary["sumDurations"] / 60).toFixed(2)} </b> minutes</p>
        <p>Fare per minute: <b>${(daySummary["sumFares"] / daySummary["sumDurations"] * 60).toFixed(2)}</b></p>
        <div className="flex self-center justify-self-center p-2">
        <DayTripBreakdown daySummary={daySummary}></DayTripBreakdown>
        </div>
      </div>
    );
  }

  function convertToAmPm(hour: number) {
    // Validate the input to ensure it's within the expected range
    if (hour < 0 || hour > 23) {
      return 'Invalid hour';
    }

    // Determine the suffix and adjust hours for 12-hour format
    const suffix = hour < 12 ? 'AM' : 'PM';
    let hourIn12 = hour % 12;

    // Adjust the hour since 0 should be converted to 12 for 12-hour format
    if (hourIn12 === 0) {
      hourIn12 = 12;
    }

    return `${hourIn12} ${suffix}`;
  }

  
function DayTripBreakdown({ daySummary }: { daySummary: DaySummary }) {
  const tripTimes = daySummary['tripTimes']
  return (
    <table>
      <thead>
        <tr>
          <th className="text-xs px-2">Time</th>
          <th className="text-xs px-2">Trips</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(tripTimes).map((time) => (
          <tr key={time}> {/* Add the key prop here */}
            <td className="text-xs px-2">{convertToAmPm(Number(time))}</td>
            <td className="text-xs px-2">{tripTimes[time]} trips</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
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
              <DaySummaryComponent daySummary={daySummary} />
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
