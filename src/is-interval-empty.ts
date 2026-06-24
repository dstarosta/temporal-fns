import { compare } from './helpers/compare.js';
import { type DateLike, type Interval } from './types.js';

/**
 * @summary Is the given interval empty (its start equals its end)?
 *
 * @description
 * Is the given interval empty (its start equals its end)?
 *
 * @param interval - The interval to check
 *
 * @returns Whether the interval's `start` equals its `end`
 *
 * @example
 * isIntervalEmpty({ start: new Date(2014, 0, 10), end: new Date(2014, 0, 10) })
 * //=> true
 *
 * @example
 * isIntervalEmpty({ start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) })
 * //=> false
 */
export function isIntervalEmpty(interval: Interval<Date>): boolean;
/**
 * @summary Is the given interval empty (its start equals its end)?
 *
 * @description
 * Is the given interval empty (its start equals its end)?
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `interval`.
 *
 * @param interval - The interval to check
 *
 * @returns Whether the interval's `start` equals its `end`
 *
 * @example
 * isIntervalEmpty({ start: new Date(2014, 0, 10), end: new Date(2014, 0, 10) })
 * //=> true
 *
 * @example
 * isIntervalEmpty({ start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) })
 * //=> false
 */
export function isIntervalEmpty<T extends DateLike>(interval: Interval<T>): boolean;
export function isIntervalEmpty(interval: Interval<Date | DateLike>): boolean {
  return compare(interval.start, interval.end) === 0;
}
