import { addWeeks } from './add-weeks.js';
import { eachOfInterval, type EachOfIntervalOptions } from './helpers/create-each-of-interval.js';
import { startOfWeekValue, type StartOfWeekOptions } from './start-of-week.js';
import { type DateLike, type Interval } from './types.js';

/**
 * The {@link eachWeekOfInterval} function options.
 */
export interface EachWeekOfIntervalOptions extends EachOfIntervalOptions, StartOfWeekOptions {}

/**
 * @summary Return the array of weeks within the specified time interval.
 *
 * @description
 * Return the array of weeks within the specified time interval.
 *
 * @param interval - The interval.
 * @param options - An object with options.
 *
 * @returns The array with starts of weeks from the week of the interval start to the week of the interval end
 *
 * @example
 * // Each week within interval 6 October 2014 - 23 November 2014:
 * const result = eachWeekOfInterval({
 *   start: new Date(2014, 9, 6),
 *   end: new Date(2014, 10, 23)
 * })
 * //=> [
 * //   Sun Oct 05 2014 00:00:00,
 * //   Sun Oct 12 2014 00:00:00,
 * //   Sun Oct 19 2014 00:00:00,
 * //   Sun Oct 26 2014 00:00:00,
 * //   Sun Nov 02 2014 00:00:00,
 * //   Sun Nov 09 2014 00:00:00,
 * //   Sun Nov 16 2014 00:00:00,
 * //   Sun Nov 23 2014 00:00:00
 * // ]
 */
export function eachWeekOfInterval(
  interval: Interval<Date>,
  options?: EachWeekOfIntervalOptions
): Date[];
/**
 * @summary Return the array of weeks within the specified time interval.
 *
 * @description
 * Return the array of weeks within the specified time interval.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `interval`; the result array has the same concrete type.
 *
 * @param interval - The interval.
 * @param options - An object with options.
 *
 * @returns The array with starts of weeks from the week of the interval start to the week of the interval end
 *
 * @example
 * // Each week within interval 6 October 2014 - 23 November 2014:
 * const result = eachWeekOfInterval({
 *   start: new Date(2014, 9, 6),
 *   end: new Date(2014, 10, 23)
 * })
 * //=> [
 * //   Sun Oct 05 2014 00:00:00,
 * //   Sun Oct 12 2014 00:00:00,
 * //   Sun Oct 19 2014 00:00:00,
 * //   Sun Oct 26 2014 00:00:00,
 * //   Sun Nov 02 2014 00:00:00,
 * //   Sun Nov 09 2014 00:00:00,
 * //   Sun Nov 16 2014 00:00:00,
 * //   Sun Nov 23 2014 00:00:00
 * // ]
 */
export function eachWeekOfInterval<T extends DateLike>(
  interval: Interval<T>,
  options?: EachWeekOfIntervalOptions
): T[];
export function eachWeekOfInterval(
  interval: Interval<Date | DateLike>,
  options?: EachWeekOfIntervalOptions
): (Date | DateLike)[] {
  const snap = (date: Date | DateLike): Date | DateLike => startOfWeekValue(date, options);
  return eachOfInterval(interval, options, snap, addWeeks);
}
