import { endOfDay } from './end-of-day.js';
import { yesterdayZonedDateTime } from './yesterday-zoned-date-time.js';

/**
 * @summary Return the end of yesterday as a `Temporal.ZonedDateTime`.
 *
 * @description
 * Return the end of yesterday (23:59:59.999999999) as a `Temporal.ZonedDateTime` in the given
 * timezone.
 *
 * @param timeZone - The IANA timezone identifier to use. Defaults to the system's current timezone.
 *
 * @returns The end of yesterday in `timeZone`, as a `Temporal.ZonedDateTime`
 */
export function endOfYesterdayZonedDateTime(timeZone?: string): Temporal.ZonedDateTime {
  return endOfDay(yesterdayZonedDateTime(timeZone));
}
