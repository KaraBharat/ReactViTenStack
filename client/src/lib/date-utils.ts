import { format } from "date-fns";
import { fromZonedTime } from "date-fns-tz";

type Period = {
  from: string | Date | undefined;
  to: string | Date | undefined;
};

export function formatDateRange(period?: Period) {
  if (!period?.from || !period?.to) {
    return "Select Date Range";
  }

  if (!period?.to) {
    return `${format(period.from, "LLL dd")} - ${format(
      period.from,
      "LLL dd, y",
    )}`;
  }

  if (period.to) {
    return `${format(period.from, "LLL dd")} - ${format(
      period.to,
      "LLL dd, y",
    )}`;
  }

  return `${format(period.from, "LLL dd, y")}`;
}

/**
 * Gets the browser's timezone
 * @returns The IANA timezone string (e.g., "Asia/Kolkata")
 */
export const getBrowserTimeZone = (): string => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

/**
 * Converts a date string from local timezone to UTC
 * @param date - The date string to convert (e.g., "2025-01-31")
 * @param timeZone - The timezone to convert from (e.g., "Asia/Kolkata")
 * @returns ISO string in UTC or undefined if no date provided
 */
export const convertToUTC = (
  date: string | undefined,
  timeZone: string = getBrowserTimeZone(),
): string | undefined => {
  if (!date) return undefined;
  return fromZonedTime(date, timeZone).toISOString();
};
