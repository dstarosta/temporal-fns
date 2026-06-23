import { compare } from './helpers/compare.js';
import { toDstNormalizedMilliseconds } from './helpers/to-dst-normalized-milliseconds.js';
import { type DateLike, type Interval } from './types.js';

const millisecondsInDay = 86_400_000;

/**
 * @summary Get the number of days that overlap in two time intervals
 *
 * @description
 * Get the number of days that overlap in two time intervals. It uses the time
 * between dates to calculate the number of days, rounding it up to include
 * partial days.
 *
 * Two equal 0-length intervals will result in 0. Two equal 1ms intervals will
 * result in 1.
 *
 * @param intervalLeft - The first interval to compare.
 * @param intervalRight - The second interval to compare.
 *
 * @returns The number of days that overlap in two time intervals
 *
 * @example
 * // For overlapping time intervals adds 1 for each started overlapping day:
 * getOverlappingDaysInIntervals(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 17), end: new Date(2014, 0, 21) }
 * )
 * //=> 3
 *
 * @example
 * // For non-overlapping time intervals returns 0:
 * getOverlappingDaysInIntervals(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 21), end: new Date(2014, 0, 22) }
 * )
 * //=> 0
 */
export function getOverlappingDaysInIntervals(
  intervalLeft: Interval<Date>,
  intervalRight: Interval<Date>
): number;
/**
 * @summary Get the number of days that overlap in two time intervals
 *
 * @description
 * Get the number of days that overlap in two time intervals. It uses the time
 * between dates to calculate the number of days, rounding it up to include
 * partial days.
 *
 * Two equal 0-length intervals will result in 0. Two equal 1ms intervals will
 * result in 1.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `intervalLeft`/`intervalRight`, which must share the
 * same concrete type.
 *
 * @param intervalLeft - The first interval to compare.
 * @param intervalRight - The second interval to compare.
 *
 * @returns The number of days that overlap in two time intervals
 *
 * @example
 * // For overlapping time intervals adds 1 for each started overlapping day:
 * getOverlappingDaysInIntervals(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 17), end: new Date(2014, 0, 21) }
 * )
 * //=> 3
 *
 * @example
 * // For non-overlapping time intervals returns 0:
 * getOverlappingDaysInIntervals(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 21), end: new Date(2014, 0, 22) }
 * )
 * //=> 0
 */
export function getOverlappingDaysInIntervals<T extends DateLike>(
  intervalLeft: Interval<T>,
  intervalRight: Interval<T>
): number;
export function getOverlappingDaysInIntervals(
  intervalLeft: Interval<Date | DateLike>,
  intervalRight: Interval<Date | DateLike>
): number {
  const [leftStart, leftEnd] =
    compare(intervalLeft.start, intervalLeft.end) <= 0
      ? [intervalLeft.start, intervalLeft.end]
      : [intervalLeft.end, intervalLeft.start];
  const [rightStart, rightEnd] =
    compare(intervalRight.start, intervalRight.end) <= 0
      ? [intervalRight.start, intervalRight.end]
      : [intervalRight.end, intervalRight.start];

  const isOverlapping = compare(leftStart, rightEnd) < 0 && compare(rightStart, leftEnd) < 0;
  if (!isOverlapping) {
    return 0;
  }

  const overlapLeft = compare(rightStart, leftStart) < 0 ? leftStart : rightStart;
  const overlapRight = compare(rightEnd, leftEnd) > 0 ? leftEnd : rightEnd;

  const left = toDstNormalizedMilliseconds(overlapLeft);
  const right = toDstNormalizedMilliseconds(overlapRight);

  return Math.ceil((right - left) / millisecondsInDay);
}
