import { format, type FormatOptions } from './format.js';
import { toEpochMilliseconds } from './helpers/to-epoch-milliseconds.js';
import { type DateLike } from './types.js';

/**
 * @summary Format the date in the given time zone, regardless of the system's own time zone.
 *
 * @description
 * Format the date in the given time zone, regardless of the system's own time zone. Both the
 * wall-clock fields (year/month/day/hour/etc.) and the `x`/`X`/`O`/`z` timezone tokens reflect
 * `timeZone`.
 *
 * Mirrors `date-fns-tz`'s `formatInTimeZone`. Unlike `date-fns-tz`'s own implementation (which
 * hand-rolls the offset/DST resolution for a plain `Date`), the given date's real instant is
 * attached directly to `timeZone` via `Temporal.ZonedDateTime`, so the result is exactly what the
 * IANA time zone database says applies at that instant — including the `z`/`zzzz` specific-name
 * tokens, which resolve via `Intl.DateTimeFormat` against that same `ZonedDateTime`.
 *
 * @param date - The date representing the real instant to format
 * @param timeZone - The IANA time zone identifier to format `date` in (e.g. `'Europe/Paris'`)
 * @param formatStr - The string of tokens
 * @param options - An object with options
 *
 * @returns The formatted date string
 *
 * @example
 * const date = new Date('2014-10-25T10:46:20Z')
 * const result = formatInTimeZone(date, 'America/New_York', 'yyyy-MM-dd HH:mm:ss zzz')
 * //=> '2014-10-25 06:46:20 EST'
 */
export function formatInTimeZone(
  date: Date | DateLike,
  timeZone: string,
  formatStr: string,
  options?: FormatOptions
): string {
  const epochMilliseconds = toEpochMilliseconds(date);
  const zoned =
    Temporal.Instant.fromEpochMilliseconds(epochMilliseconds).toZonedDateTimeISO(timeZone);
  return format(zoned, formatStr, options);
}
