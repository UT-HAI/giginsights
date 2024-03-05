import { parse } from "csv-parse/sync";
import fetch from "node-fetch";

export async function downloadFile(downloadUrl: string) {
  const response = await fetch(downloadUrl);
  const buffer = await response.arrayBuffer();
  return Buffer.from(buffer);
}

export async function parseCSV(fileContent: Buffer) {
  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  });

  records.map((row: any) => {
    Object.keys(row).forEach((key) => {
      if (key === "Set Destination Trip") {
        row[key] = row[key] === "TRUE";
      } else if (!isNaN(row[key]) && row[key] !== "") {
        row[key] = parseFloat(row[key]);
      }
    });
  });

  const summary = records.reduce((acc: Array<any>, trip: any) => {
    const date = trip["Local Request Timestamp"].split("T")[0];
    const time = trip["Local Request Timestamp"].split("T")[1].split(":")[0];

    if (!acc[date]) {
      acc[date] = {
        date: date,
        sumDistances: 0,
        sumFares: 0,
        sumDurations: 0,
        numberOfTrips: 0,
        tripTimes: {}
      };
    }

    // Accumulate the values
    acc[date].sumDistances += trip["Trip Distance (miles)"];
    acc[date].sumFares += trip["Local Original Fare"];
    acc[date].sumDurations += trip["Duration (Seconds)"];
    acc[date].numberOfTrips += 1;
    if (!acc[date].tripTimes[time]) {
      acc[date].tripTimes[time] = 0
    }
    acc[date].tripTimes[time] += 1;

    return acc;
  }, {});

  return summary;
}
