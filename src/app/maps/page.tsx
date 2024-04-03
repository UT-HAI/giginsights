import fs from 'fs';
import { parse } from 'csv-parse/sync';
import dynamic from 'next/dynamic';

export default function Page() {

  // Read the file into a string
  const fileContent = fs.readFileSync('./src/driver_app_analytics-0.csv', 'utf8');

  // Parse the CSV content
  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true
  });

  const MapWithNoSSR = dynamic(
    () => import('@/components/ui/Map'),
    { ssr: false }
  );

  // Process the first 1000 records to get latitude and longitude
  const latLongList = records.slice(0, 4000).map((row: any) => [parseFloat(row.Latitude), parseFloat(row.Longitude)]);

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center pl-6 pt-6">
        <h1 className="text-stone-800 text-2xl font-semibold font-['Inter'] mb-6 ml-6">Map</h1>
        <MapWithNoSSR coordinates={latLongList}></MapWithNoSSR>
      </div>
    </div>
  )

}
