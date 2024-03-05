export default interface DaySummary {
  date: string;
  sumDistances: number;
  sumFares: number;
  sumDurations: number;
  numberOfTrips: number;
  tripTimes: Record<string, number>
}
