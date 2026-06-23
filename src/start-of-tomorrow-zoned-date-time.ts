import { startOfDay } from './start-of-day.js';
import { tomorrowZonedDateTime } from './tomorrow-zoned-date-time.js';

/**
 * @summary Return the start of tomorrow as a `Temporal.ZonedDateTime`.
 *
 * @description
 * Return the start of tomorrow (midnight) as a `Temporal.ZonedDateTime` in the given timezone.
 *
 * @param timeZone - The IANA timezone identifier to use. Defaults to the system's current timezone.
 *
 * @returns Midnight tomorrow in `timeZone`, as a `Temporal.ZonedDateTime`
 */
export function startOfTomorrowZonedDateTime(timeZone?: string): Temporal.ZonedDateTime {
  return startOfDay(tomorrowZonedDateTime(timeZone));
}
