import { DateLike } from "./types.js";

//#region src/from-zoned-time.d.ts
/**
 * @summary Get the `Date` representing the real instant of a local time in the given time zone.
 *
 * @description
 * Treats the given date's wall-clock fields (year/month/day/hour/minute/second/millisecond) as
 * the local time in `timeZone`, and returns the `Date` instance with the equivalent real instant
 * — i.e. if the input represented local time in `timeZone`, the returned `Date`'s timestamp gives
 * the equivalent instant regardless of the system's own time zone.
 *
 * Mirrors `date-fns-tz`'s `fromZonedTime`, built on `Temporal.ZonedDateTime` for the
 * time-zone-to-instant resolution instead of `date-fns-tz`'s own hand-rolled offset parsing.
 *
 * @param date - The date with wall-clock fields representing the local time in `timeZone`
 * @param timeZone - The IANA time zone identifier the date's fields belong to (e.g.
 *   `'America/Los_Angeles'`)
 *
 * @returns The `Date` instance with the equivalent real instant
 *
 * @example
 * // In June, 10am in Los Angeles is 5pm UTC:
 * const result = fromZonedTime(new Date(2014, 5, 25, 10, 0, 0), 'America/Los_Angeles')
 * //=> 2014-06-25T17:00:00.000Z
 */
declare function fromZonedTime(date: Date | DateLike, timeZone: string): Date;
//#endregion
export { fromZonedTime };
//# sourceMappingURL=from-zoned-time.d.ts.map