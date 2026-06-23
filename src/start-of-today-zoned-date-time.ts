import { startOfDay } from './start-of-day.js';
import { todayZonedDateTime } from './today-zoned-date-time.js';

/**
 * @summary Return the start of today as a `Temporal.ZonedDateTime`.
 *
 * @description
 * Return the start of today (midnight) as a `Temporal.ZonedDateTime` in the given timezone.
 *
 * @param timeZone - The IANA timezone identifier to use. Defaults to the system's current timezone.
 *
 * @returns Midnight today in `timeZone`, as a `Temporal.ZonedDateTime`
 */
export function startOfTodayZonedDateTime(timeZone?: string): Temporal.ZonedDateTime {
  return startOfDay(todayZonedDateTime(timeZone));
}
