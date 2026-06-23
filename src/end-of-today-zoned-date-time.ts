import { endOfDay } from './end-of-day.js';
import { todayZonedDateTime } from './today-zoned-date-time.js';

/**
 * @summary Return the end of today as a `Temporal.ZonedDateTime`.
 *
 * @description
 * Return the end of today (23:59:59.999999999) as a `Temporal.ZonedDateTime` in the given
 * timezone.
 *
 * @param timeZone - The IANA timezone identifier to use. Defaults to the system's current timezone.
 *
 * @returns The end of today in `timeZone`, as a `Temporal.ZonedDateTime`
 */
export function endOfTodayZonedDateTime(timeZone?: string): Temporal.ZonedDateTime {
  return endOfDay(todayZonedDateTime(timeZone));
}
