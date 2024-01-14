import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { convertUtcToTimeZone } from "./date";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateWorkingHours = (
  startTime: Date,
  endTime: Date | null,
  breakTime?: number | null
) => {
  if (!endTime) return "-";

  const startZoned = convertUtcToTimeZone(startTime);
  const endZoned = convertUtcToTimeZone(endTime);

  const diffInMinutes =
    (endZoned.getTime() - startZoned.getTime()) / (1000 * 60);

  const totalMinutes = Math.round(diffInMinutes - (breakTime || 0));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return hours > 0 ? `${hours}時間${minutes}分` : `${minutes}分`;
};
