import { Duration } from "./format-duration.js";
import { DateLike } from "./types.js";

//#region src/sub.d.ts
/**
 * @summary Subtract the specified years, months, weeks, days, hours, minutes and seconds from the given date.
 *
 * @description
 * Subtract the specified years, months, weeks, days, hours, minutes and seconds from the given date.
 *
 * Throws a `TypeError` if `duration` has any of `hours`/`minutes`/`seconds` set and `date` is a
 * `Temporal.PlainDate`, since plain dates have no time component.
 *
 * @param date - The date to be changed
 * @param duration - The object with years, months, weeks, days, hours, minutes and seconds to be subtracted
 *
 * @returns The new date with the seconds subtracted
 *
 * @example
 * // Subtract the following duration from 15 June 2017 15:29:20
 * const result = sub(new Date(2017, 5, 15, 15, 29, 20), {
 *   years: 2,
 *   months: 9,
 *   weeks: 1,
 *   days: 7,
 *   hours: 5,
 *   minutes: 9,
 *   seconds: 30
 * })
 * //=> Mon Sep 1 2014 10:19:50
 */
declare function sub(date: Date, duration: Duration): Date;
/**
 * @summary Subtract the specified years, months, weeks, days, hours, minutes and seconds from the given date.
 *
 * @description
 * Subtract the specified years, months, weeks, days, hours, minutes and seconds from the given date.
 *
 * Throws a `TypeError` if `duration` has any of `hours`/`minutes`/`seconds` set and `date` is a
 * `Temporal.PlainDate`, since plain dates have no time component.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param duration - The object with years, months, weeks, days, hours, minutes and seconds to be subtracted
 *
 * @returns The new date with the seconds subtracted
 *
 * @example
 * // Subtract the following duration from 15 June 2017 15:29:20
 * const result = sub(new Date(2017, 5, 15, 15, 29, 20), {
 *   years: 2,
 *   months: 9,
 *   weeks: 1,
 *   days: 7,
 *   hours: 5,
 *   minutes: 9,
 *   seconds: 30
 * })
 * //=> Mon Sep 1 2014 10:19:50
 */
declare function sub<T extends DateLike>(date: T, duration: Duration): T;
//#endregion
export { sub };
//# sourceMappingURL=sub.d.ts.map