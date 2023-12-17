import { zonedTimeToUtc, utcToZonedTime, format } from "date-fns-tz";

const timeZone = "Asia/Tokyo";

export const convertUtcToTimeZone = (date: Date | string): Date => {
  return utcToZonedTime(date, timeZone);
};

export const formatInTimeZone = (date: Date, fmt: string): string => {
  return format(date, fmt, { timeZone });
};

export const nowInTimeZone = (): Date => {
  return convertUtcToTimeZone(new Date());
};
