import { endOfDay } from './end-of-day.js';
import { tomorrowZonedDateTime } from './tomorrow-zoned-date-time.js';

/**
 * @summary Return the end of tomorrow as a `Temporal.ZonedDateTime`.
 *
 * @description
 * Return the end of tomorrow (23:59:59.999999999) as a `Temporal.ZonedDateTime` in the given
 * timezone.
 *
 * @param timeZone - The IANA timezone identifier to use. Defaults to the system's current timezone.
 *
 * @returns The end of tomorrow in `timeZone`, as a `Temporal.ZonedDateTime`
 */
export function endOfTomorrowZonedDateTime(timeZone?: string): Temporal.ZonedDateTime {
  return endOfDay(tomorrowZonedDateTime(timeZone));
}
