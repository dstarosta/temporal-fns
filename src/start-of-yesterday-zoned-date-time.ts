import { startOfDay } from './start-of-day.js';
import { yesterdayZonedDateTime } from './yesterday-zoned-date-time.js';

/**
 * @summary Return the start of yesterday as a `Temporal.ZonedDateTime`.
 *
 * @description
 * Return the start of yesterday (midnight) as a `Temporal.ZonedDateTime` in the given timezone.
 *
 * @param timeZone - The IANA timezone identifier to use. Defaults to the system's current timezone.
 *
 * @returns Midnight yesterday in `timeZone`, as a `Temporal.ZonedDateTime`
 */
export function startOfYesterdayZonedDateTime(timeZone?: string): Temporal.ZonedDateTime {
  return startOfDay(yesterdayZonedDateTime(timeZone));
}
