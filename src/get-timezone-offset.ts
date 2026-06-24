import { toEpochMilliseconds } from './helpers/to-epoch-milliseconds.js';
import { type DateLike } from './types.js';

/**
 * @summary Get the offset, in milliseconds, between an IANA time zone and UTC.
 *
 * @description
 * Get the offset, in milliseconds, between an IANA time zone and UTC, at the instant of the
 * given date (defaults to now). Mirrors `date-fns-tz`'s `getTimezoneOffset`, but the underlying
 * offset lookup is delegated to `Temporal.ZonedDateTime`, which natively resolves daylight-saving
 * transitions and "spring forward" gaps — `date-fns-tz`'s own implementation hand-rolls this
 * resolution and is documented to fall back to an approximation in the ambiguous/gap case;
 * `getTimezoneOffset` here always reflects what the IANA time zone database itself says applies
 * at that instant.
 *
 * For `Date`/`Temporal.ZonedDateTime` input, the instant is the value's own real elapsed-time
 * instant. For `Temporal.PlainDate`/`Temporal.PlainDateTime` input (which carry no time zone),
 * per the UTC rule, their wall-clock fields are read as UTC to derive the instant.
 *
 * @param timeZone - The IANA time zone identifier (e.g. `'America/New_York'`)
 * @param date - The instant at which to look up the offset (defaults to the current instant)
 *
 * @returns The offset in milliseconds (positive east of UTC, negative west of UTC)
 *
 * @example
 * const result = getTimezoneOffset('America/New_York', new Date(2016, 0, 1))
 * //=> -18000000 (-5 * 60 * 60 * 1000, EST)
 *
 * @example
 * const result = getTimezoneOffset('America/New_York', new Date(2016, 6, 1))
 * //=> -14400000 (-4 * 60 * 60 * 1000, EDT)
 */
export function getTimezoneOffset(timeZone: string, date: Date | DateLike = new Date()): number {
  const epochMilliseconds = toEpochMilliseconds(date);
  const zoned =
    Temporal.Instant.fromEpochMilliseconds(epochMilliseconds).toZonedDateTimeISO(timeZone);
  return zoned.offsetNanoseconds / 1_000_000;
}
