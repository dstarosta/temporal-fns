import { compare } from './helpers/compare.js';
import { type DateLike, type Interval } from './types.js';

/**
 * The {@link areIntervalsOverlapping} function options.
 */
export interface AreIntervalsOverlappingOptions {
  inclusive?: boolean;
}

/**
 * @summary Is the given time interval overlapping with another time interval?
 *
 * @description
 * Is the given time interval overlapping with another time interval? Adjacent intervals do not
 * count as overlapping unless `inclusive` is set to `true`.
 *
 * @param intervalLeft - The first interval to compare.
 * @param intervalRight - The second interval to compare.
 * @param options - The object with options
 *
 * @returns Whether the time intervals are overlapping
 *
 * @example
 * // For overlapping time intervals:
 * areIntervalsOverlapping(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 17), end: new Date(2014, 0, 21) }
 * )
 * //=> true
 *
 * @example
 * // For non-overlapping time intervals:
 * areIntervalsOverlapping(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 21), end: new Date(2014, 0, 22) }
 * )
 * //=> false
 *
 * @example
 * // For adjacent time intervals:
 * areIntervalsOverlapping(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 20), end: new Date(2014, 0, 30) }
 * )
 * //=> false
 *
 * @example
 * // Using the inclusive option:
 * areIntervalsOverlapping(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 20), end: new Date(2014, 0, 24) },
 *   { inclusive: true }
 * )
 * //=> true
 */
export function areIntervalsOverlapping(
  intervalLeft: Interval<Date>,
  intervalRight: Interval<Date>,
  options?: AreIntervalsOverlappingOptions
): boolean;
/**
 * @summary Is the given time interval overlapping with another time interval?
 *
 * @description
 * Is the given time interval overlapping with another time interval? Adjacent intervals do not
 * count as overlapping unless `inclusive` is set to `true`.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `intervalLeft`/`intervalRight`, which must share the
 * same concrete type.
 *
 * @param intervalLeft - The first interval to compare.
 * @param intervalRight - The second interval to compare.
 * @param options - The object with options
 *
 * @returns Whether the time intervals are overlapping
 *
 * @example
 * // For overlapping time intervals:
 * areIntervalsOverlapping(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 17), end: new Date(2014, 0, 21) }
 * )
 * //=> true
 *
 * @example
 * // For non-overlapping time intervals:
 * areIntervalsOverlapping(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 21), end: new Date(2014, 0, 22) }
 * )
 * //=> false
 *
 * @example
 * // For adjacent time intervals:
 * areIntervalsOverlapping(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 20), end: new Date(2014, 0, 30) }
 * )
 * //=> false
 *
 * @example
 * // Using the inclusive option:
 * areIntervalsOverlapping(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 20), end: new Date(2014, 0, 24) },
 *   { inclusive: true }
 * )
 * //=> true
 */
export function areIntervalsOverlapping<T extends DateLike>(
  intervalLeft: Interval<T>,
  intervalRight: Interval<T>,
  options?: AreIntervalsOverlappingOptions
): boolean;
export function areIntervalsOverlapping(
  intervalLeft: Interval<Date | DateLike>,
  intervalRight: Interval<Date | DateLike>,
  options?: AreIntervalsOverlappingOptions
): boolean {
  const [leftStart, leftEnd] =
    compare(intervalLeft.start, intervalLeft.end) <= 0
      ? [intervalLeft.start, intervalLeft.end]
      : [intervalLeft.end, intervalLeft.start];
  const [rightStart, rightEnd] =
    compare(intervalRight.start, intervalRight.end) <= 0
      ? [intervalRight.start, intervalRight.end]
      : [intervalRight.end, intervalRight.start];

  if (options?.inclusive) {
    return compare(leftStart, rightEnd) <= 0 && compare(rightStart, leftEnd) <= 0;
  }
  return compare(leftStart, rightEnd) < 0 && compare(rightStart, leftEnd) < 0;
}
