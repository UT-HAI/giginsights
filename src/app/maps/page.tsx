import fs from 'fs';
import { parse } from 'csv-parse/sync';
import Map from '@/components/ui/Map';

export default function Page() {
  const results: number[] = [];

  // Read the file into a string
  const fileContent = fs.readFileSync('./src/driver_app_analytics-0.csv', 'utf8');

  // Parse the CSV content
  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true
  });

  // Process the first 1000 records to get latitude and longitude
  const latLongList = records.slice(0, 1000).map(row => [parseFloat(row.Latitude), parseFloat(row.Longitude)]);

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center pl-6 pt-6">
        <h1 className="text-stone-800 text-2xl font-semibold font-['Inter'] mb-6 ml-6">Map</h1>
        <Map coordinates={latLongList}></Map>
      </div>
    </div>
  )

}
