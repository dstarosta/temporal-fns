import { addDays } from './add-days.js';
import { withDate } from './helpers/convert.js';
import { eachOfInterval, type EachOfIntervalOptions } from './helpers/create-each-of-interval.js';
import { zeroTime } from './helpers/zero-time.js';
import { type DateLike, type Interval } from './types.js';

/**
 * @summary Return the array of dates within the specified time interval.
 *
 * @description
 * Return the array of dates within the specified time interval.
 *
 * Untyped variant of {@link eachDayOfInterval} that accepts and returns the `Date | DateLike`
 * union directly, without the overloaded type narrowing.
 *
 * @param interval - The interval.
 * @param options - An object with options.
 *
 * @returns The array with starts of days from the day of the interval start to the day of the interval end
 */
export function eachDayOfIntervalValue(
  interval: Interval<Date | DateLike>,
  options?: EachOfIntervalOptions
): (Date | DateLike)[] {
  const snap = (date: Date | DateLike): Date | DateLike =>
    date instanceof Date ? withDate(date, (dateTime) => zeroTime(dateTime)) : zeroTime(date);
  return eachOfInterval(interval, options, snap, addDays);
}

/**
 * @summary Return the array of dates within the specified time interval.
 *
 * @description
 * Return the array of dates within the specified time interval.
 *
 * @param interval - The interval.
 * @param options - An object with options.
 *
 * @returns The array with starts of days from the day of the interval start to the day of the interval end
 *
 * @example
 * // Each day between 6 October 2014 and 10 October 2014:
 * const result = eachDayOfInterval({
 *   start: new Date(2014, 9, 6),
 *   end: new Date(2014, 9, 10)
 * })
 * //=> [
 * //   Mon Oct 06 2014 00:00:00,
 * //   Tue Oct 07 2014 00:00:00,
 * //   Wed Oct 08 2014 00:00:00,
 * //   Thu Oct 09 2014 00:00:00,
 * //   Fri Oct 10 2014 00:00:00
 * // ]
 */
export function eachDayOfInterval(
  interval: Interval<Date>,
  options?: EachOfIntervalOptions
): Date[];
/**
 * @summary Return the array of dates within the specified time interval.
 *
 * @description
 * Return the array of dates within the specified time interval.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `interval`; the result array has the same concrete type.
 *
 * @param interval - The interval.
 * @param options - An object with options.
 *
 * @returns The array with starts of days from the day of the interval start to the day of the interval end
 *
 * @example
 * // Each day between 6 October 2014 and 10 October 2014:
 * const result = eachDayOfInterval({
 *   start: new Date(2014, 9, 6),
 *   end: new Date(2014, 9, 10)
 * })
 * //=> [
 * //   Mon Oct 06 2014 00:00:00,
 * //   Tue Oct 07 2014 00:00:00,
 * //   Wed Oct 08 2014 00:00:00,
 * //   Thu Oct 09 2014 00:00:00,
 * //   Fri Oct 10 2014 00:00:00
 * // ]
 */
export function eachDayOfInterval<T extends DateLike>(
  interval: Interval<T>,
  options?: EachOfIntervalOptions
): T[];
export function eachDayOfInterval(
  interval: Interval<Date | DateLike>,
  options?: EachOfIntervalOptions
): (Date | DateLike)[] {
  return eachDayOfIntervalValue(interval, options);
}
