export function getMinutesDifference(startDate: Date, endDate: Date): number {
  const diffInMilliseconds = endDate.getTime() - startDate.getTime();
  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));

  return diffInMinutes;
}
