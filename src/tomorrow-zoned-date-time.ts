import { addDays } from './add-days.js';
import { todayZonedDateTime } from './today-zoned-date-time.js';

/**
 * @summary Return this time tomorrow as a `Temporal.ZonedDateTime`.
 *
 * @description
 * Return this time tomorrow as a `Temporal.ZonedDateTime` in the given timezone.
 *
 * @param timeZone - The IANA timezone identifier to use. Defaults to the system's current timezone.
 *
 * @returns This time tomorrow, as a `Temporal.ZonedDateTime` in `timeZone`
 */
export function tomorrowZonedDateTime(timeZone?: string): Temporal.ZonedDateTime {
  return addDays(todayZonedDateTime(timeZone), 1);
}
