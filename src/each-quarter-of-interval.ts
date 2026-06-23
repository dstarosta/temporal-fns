import { addQuarters } from './add-quarters.js';
import { eachOfInterval, type EachOfIntervalOptions } from './helpers/create-each-of-interval.js';
import { startOfQuarterValue } from './start-of-quarter.js';
import { type DateLike, type Interval } from './types.js';

/**
 * @summary Return the array of quarters within the specified time interval.
 *
 * @description
 * Return the array of quarters within the specified time interval.
 *
 * @param interval - The interval
 * @param options - An object with options
 *
 * @returns The array with starts of quarters from the quarter of the interval start to the quarter of the interval end
 *
 * @example
 * // Each quarter within interval 6 February 2014 - 10 August 2014:
 * const result = eachQuarterOfInterval({
 *   start: new Date(2014, 1, 6),
 *   end: new Date(2014, 7, 10),
 * })
 * //=> [
 * //   Wed Jan 01 2014 00:00:00,
 * //   Tue Apr 01 2014 00:00:00,
 * //   Tue Jul 01 2014 00:00:00,
 * // ]
 */
export function eachQuarterOfInterval(
  interval: Interval<Date>,
  options?: EachOfIntervalOptions
): Date[];
/**
 * @summary Return the array of quarters within the specified time interval.
 *
 * @description
 * Return the array of quarters within the specified time interval.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `interval`; the result array has the same concrete type.
 *
 * @param interval - The interval
 * @param options - An object with options
 *
 * @returns The array with starts of quarters from the quarter of the interval start to the quarter of the interval end
 *
 * @example
 * // Each quarter within interval 6 February 2014 - 10 August 2014:
 * const result = eachQuarterOfInterval({
 *   start: new Date(2014, 1, 6),
 *   end: new Date(2014, 7, 10),
 * })
 * //=> [
 * //   Wed Jan 01 2014 00:00:00,
 * //   Tue Apr 01 2014 00:00:00,
 * //   Tue Jul 01 2014 00:00:00,
 * // ]
 */
export function eachQuarterOfInterval<T extends DateLike>(
  interval: Interval<T>,
  options?: EachOfIntervalOptions
): T[];
export function eachQuarterOfInterval(
  interval: Interval<Date | DateLike>,
  options?: EachOfIntervalOptions
): (Date | DateLike)[] {
  return eachOfInterval(interval, options, startOfQuarterValue, addQuarters);
}
