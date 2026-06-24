import { compare } from './helpers/compare.js';
import { type DateLike, type Interval } from './types.js';

/**
 * @summary Do two intervals have the same `start` and the same `end`?
 *
 * @description
 * Do two intervals have the same `start` and the same `end`? Each interval is normalized first
 * (its earlier date treated as `start`), so a reversed interval is equivalent to its un-reversed
 * counterpart.
 *
 * @param intervalLeft - The first interval
 * @param intervalRight - The second interval
 *
 * @returns Whether the two intervals have the same `start` and `end`
 *
 * @example
 * areIntervalsEquivalent(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) }
 * )
 * //=> true
 */
export function areIntervalsEquivalent(
  intervalLeft: Interval<Date>,
  intervalRight: Interval<Date>
): boolean;
/**
 * @summary Do two intervals have the same `start` and the same `end`?
 *
 * @description
 * Do two intervals have the same `start` and the same `end`? Each interval is normalized first
 * (its earlier date treated as `start`), so a reversed interval is equivalent to its un-reversed
 * counterpart.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `intervalLeft`/`intervalRight`, which must share the
 * same concrete type.
 *
 * @param intervalLeft - The first interval
 * @param intervalRight - The second interval
 *
 * @returns Whether the two intervals have the same `start` and `end`
 *
 * @example
 * areIntervalsEquivalent(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) }
 * )
 * //=> true
 */
export function areIntervalsEquivalent<T extends DateLike>(
  intervalLeft: Interval<T>,
  intervalRight: Interval<T>
): boolean;
export function areIntervalsEquivalent(
  intervalLeft: Interval<Date | DateLike>,
  intervalRight: Interval<Date | DateLike>
): boolean {
  const [leftStart, leftEnd] =
    compare(intervalLeft.start, intervalLeft.end) <= 0
      ? [intervalLeft.start, intervalLeft.end]
      : [intervalLeft.end, intervalLeft.start];
  const [rightStart, rightEnd] =
    compare(intervalRight.start, intervalRight.end) <= 0
      ? [intervalRight.start, intervalRight.end]
      : [intervalRight.end, intervalRight.start];

  return compare(leftStart, rightStart) === 0 && compare(leftEnd, rightEnd) === 0;
}
