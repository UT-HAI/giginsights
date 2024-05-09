import fs from 'fs';
import { parse } from 'csv-parse/sync';
import dynamic from 'next/dynamic';

import { readFile } from 'fs/promises';


function formatDateTime(date: Date) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  let hour = date.getHours();
  const minute = date.getMinutes().toString().padStart(2, '0');
  const second = date.getSeconds().toString().padStart(2, '0');
  const amPm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12;
  hour = hour ? hour : 12; // the hour '0' should be '12'
  return `${month} ${day} ${year} ${hour}:${minute}:${second}${amPm}`;
}


function groupByTimeWithRanges(data: any, maxDifferenceInSeconds: number) {
  const groupedData = [];
  const timeRanges = [];
  const durations = [];  // Array to hold durations
  let currentGroup: any[] = [];
  let groupStartTime: any = null;
  let previousDate: any = null;

  data.forEach((item: any) => {
    const currentDate = new Date(item.time);
    if (!groupStartTime) {
      groupStartTime = currentDate; // Initialize start time for the first group
    }
    //@ts-ignore
    if (previousDate && (currentDate - previousDate) > maxDifferenceInSeconds * 1000) {
      // Calculate duration for the current group
      const duration = (previousDate - groupStartTime) / 1000;
      if (duration > 3600) {  // Only add groups longer than an hour
        groupedData.push(currentGroup);
        timeRanges.push(formatDateTime(groupStartTime) + " - " + formatDateTime(previousDate));
        durations.push(duration);
      }
      // Reset for new group
      currentGroup = [];
      groupStartTime = currentDate; // Reset start time for the new group
    }
    currentGroup.push([parseFloat(item['Latitude']), parseFloat(item['Longitude'])]);
    previousDate = currentDate;
  });

  // Handle the last group if it exists
  if (currentGroup.length > 0) {
    const duration = (previousDate - groupStartTime) / 1000;
    if (duration > 3600) {  // Only add the last group if it's longer than an hour
      groupedData.push(currentGroup);
      timeRanges.push(formatDateTime(groupStartTime) + " to " + formatDateTime(previousDate));
      durations.push(duration);
    }
  }

  return { groupedData, timeRanges, durations };
}


async function readAndProcessCSV(filePath: string) {
    try {
        const fileContent = await readFile(filePath, 'utf-8');
        const records = parse(fileContent, {
            columns: true,
            skip_empty_lines: true
        });

        //@ts-ignore
        records.sort((a, b) => new Date(a['Event Time (UTC)']) - new Date(b['Event Time (UTC)']));
        const data = records.map((record: any) => ({
            time: new Date(record['Event Time (UTC)']),
            Latitude: record.Latitude,
            Longitude: record.Longitude
        }));
        return groupByTimeWithRanges(data, 3600);
    } catch (error) {
        console.error('Error reading or processing CSV files:', error);
    }
}

export default async function Page() {


  const MapWithNoSSR = dynamic(
    () => import('@/components/ui/Map'),
    { ssr: false }
  );

  const data: any = await readAndProcessCSV("./src/driver_app_analytics-0.csv")
  console.log()

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center pl-6 pt-6">
        <h1 className="text-stone-800 text-2xl font-semibold font-['Inter'] mb-6 ml-6">Map</h1>
        {/*@ts-ignore*/}
        <MapWithNoSSR  data={data} > </MapWithNoSSR>
      </div>
    </div>
  )

}
