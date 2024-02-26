import { parse } from 'csv-parse/sync';
import * as fs from "fs";
import DriverCalendar from "../components/DriverCalendar";

export default function Page() {
  const csvFilePath = "./src/sample.csv";

  try {
    // Read the CSV file synchronously
    const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

    // Parse the CSV content
    // If you're not using the csv-parse library, you might split the content manually
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
    });

    records.map((row: any) => {
      Object.keys(row).forEach(key => {
        if (key === 'Set Destination Trip') {
          row[key] = row[key] === 'TRUE';
        } else if (!isNaN(row[key]) && row[key] !== '') { // Check if the value is numeric
          row[key] = parseFloat(row[key]);
        }
      })
    });

    const summary = records.reduce((acc: Array<any>, trip: any) => {
      // Extract the date part from the 'Local Request Timestamp'
      const date = trip['Local Request Timestamp'].split('T')[0];

      // Initialize the object for this date if it doesn't exist
      if (!acc[date]) {
        acc[date] = {
          date: date,
          sumDistances: 0,
          sumFares: 0,
          sumDurations: 0,
          numberOfTrips: 0
        };
      }

      // Accumulate the values
      acc[date].sumDistances += trip['Trip Distance (miles)'];
      acc[date].sumFares += trip['Local Original Fare'];
      acc[date].sumDurations += trip['Duration (Seconds)'];
      acc[date].numberOfTrips += 1;

      return acc;
    }, {});

    // Convert the object back into an array of summary objects
    const summaryArray = Object.values(summary);

    // Log the parsed data
    console.log("records", records);
    return (
      <div className="flex justify-center items-center">
        <div className="flex flex-col pl-6 pt-6">
          <h1 className="text-stone-800 text-2xl font-semibold font-['Inter'] mb-6">
            Calendar
          </h1>
          <DriverCalendar data={summaryArray}></DriverCalendar>
        </div>
      </div>
    );
  } catch (err) {
    // Handle errors here
    console.error('Error reading or parsing the CSV file:', err);

    return (
      <div className="flex justify-center items-center">
        <div className="flex flex-col pl-6 pt-6">
          <h1 className="text-stone-800 text-2xl font-semibold font-['Inter'] mb-6">
            Calendar
          </h1>
          <div>Failed</div>
        </div>
      </div>
    );
  }
}
