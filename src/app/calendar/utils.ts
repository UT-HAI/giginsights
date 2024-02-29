import { parse } from "csv-parse/sync";
import fetch from "node-fetch";

async function downloadFile(downloadUrl: string) {
  const response = await fetch(downloadUrl);
  const buffer = await response.arrayBuffer();
  return Buffer.from(buffer);
}

export default async function parseCSV(downloadUrl: string) {
  const fileContent = await downloadFile(downloadUrl);
  // Parse the CSV content
  // If you're not using the csv-parse library, you might split the content manually
  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  });

  records.map((row: any) => {
    Object.keys(row).forEach((key) => {
      if (key === "Set Destination Trip") {
        row[key] = row[key] === "TRUE";
      } else if (!isNaN(row[key]) && row[key] !== "") {
        // Check if the value is numeric
        row[key] = parseFloat(row[key]);
      }
    });
  });

  const summary = records.reduce((acc: Array<any>, trip: any) => {
    // Extract the date part from the 'Local Request Timestamp'
    const date = trip["Local Request Timestamp"].split("T")[0];

    // Initialize the object for this date if it doesn't exist
    if (!acc[date]) {
      acc[date] = {
        date: date,
        sumDistances: 0,
        sumFares: 0,
        sumDurations: 0,
        numberOfTrips: 0,
      };
    }

    // Accumulate the values
    acc[date].sumDistances += trip["Trip Distance (miles)"];
    acc[date].sumFares += trip["Local Original Fare"];
    acc[date].sumDurations += trip["Duration (Seconds)"];
    acc[date].numberOfTrips += 1;

    return acc;
  }, {});

  return summary;
}
