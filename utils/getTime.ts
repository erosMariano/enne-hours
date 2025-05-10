import type { ZonedDateTime } from "@internationalized/date";

export function getMinutesDifference(start: Date, end: Date): number {
  return Math.floor((end.getTime() - start.getTime()) / 60000); // 1000 * 60
}
export function zonedDateTimeToJSDate(zdt: ZonedDateTime): Date {
  return new Date(
    Date.UTC(
      zdt.year,
      zdt.month - 1,
      zdt.day,
      zdt.hour,
      zdt.minute,
      zdt.second,
      zdt.millisecond,
    ),
  );
}
