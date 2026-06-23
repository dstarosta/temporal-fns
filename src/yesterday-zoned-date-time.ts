import { subDays } from './sub-days.js';
import { todayZonedDateTime } from './today-zoned-date-time.js';

/**
 * @summary Return this time yesterday as a `Temporal.ZonedDateTime`.
 *
 * @description
 * Return this time yesterday as a `Temporal.ZonedDateTime` in the given timezone.
 *
 * @param timeZone - The IANA timezone identifier to use. Defaults to the system's current timezone.
 *
 * @returns This time yesterday, as a `Temporal.ZonedDateTime` in `timeZone`
 */
export function yesterdayZonedDateTime(timeZone?: string): Temporal.ZonedDateTime {
  return subDays(todayZonedDateTime(timeZone), 1);
}
