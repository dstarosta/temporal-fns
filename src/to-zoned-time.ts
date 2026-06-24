import { plainDateTimeToDate } from './helpers/convert.js';
import { toEpochMilliseconds } from './helpers/to-epoch-milliseconds.js';
import { type DateLike } from './types.js';

/**
 * @summary Get a `Date` whose fields represent the local time in the given time zone.
 *
 * @description
 * Get a `Date` instance whose wall-clock fields (year/month/day/hour/minute/second/millisecond,
 * read via the `Date` object's LOCAL getters, e.g. `getFullYear()`/`getHours()`) represent the
 * local time in `timeZone` of the given date's real instant. In other words, when the returned
 * `Date` is formatted (with any function that reads its local fields), it shows the equivalent
 * wall-clock time in `timeZone`, regardless of the system's own time zone.
 *
 * Mirrors `date-fns-tz`'s `toZonedTime`, built on `Temporal.ZonedDateTime` for the
 * instant-to-time-zone resolution instead of `date-fns-tz`'s own hand-rolled offset parsing.
 *
 * @param date - The date with the relevant real instant
 * @param timeZone - The IANA time zone identifier to get local time for (e.g.
 *   `'America/New_York'`)
 *
 * @returns A `Date` whose local fields represent the wall-clock time in `timeZone`
 *
 * @example
 * // In June, 10am UTC is 6am in New York (-04:00):
 * const result = toZonedTime(new Date('2014-06-25T10:00:00.000Z'), 'America/New_York')
 * //=> Jun 25 2014 06:00:00 (in the system's own time zone fields)
 */
export function toZonedTime(date: Date | DateLike, timeZone: string): Date {
  const epochMilliseconds = toEpochMilliseconds(date);
  const zoned =
    Temporal.Instant.fromEpochMilliseconds(epochMilliseconds).toZonedDateTimeISO(timeZone);
  return plainDateTimeToDate(zoned.toPlainDateTime());
}
