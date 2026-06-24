import { compare } from './helpers/compare.js';
import { type DateLike, type Interval } from './types.js';

function normalize<T extends Date | DateLike>(interval: Interval<T>): [T, T] {
  return compare(interval.start, interval.end) <= 0
    ? [interval.start, interval.end]
    : [interval.end, interval.start];
}

/**
 * @summary Is `intervalLeft` fully contained within `intervalRight`?
 *
 * @description
 * Untyped variant of {@link isIntervalSubset} that accepts the `Date | DateLike` union directly,
 * without the overloaded type narrowing.
 *
 * @param intervalLeft - The interval to check
 * @param intervalRight - The interval that might contain `intervalLeft`
 *
 * @returns Whether `intervalLeft` is fully contained within `intervalRight`
 */
export function isIntervalSubsetValue(
  intervalLeft: Interval<Date | DateLike>,
  intervalRight: Interval<Date | DateLike>
): boolean {
  const [leftStart, leftEnd] = normalize(intervalLeft);
  const [rightStart, rightEnd] = normalize(intervalRight);

  return compare(leftStart, rightStart) >= 0 && compare(leftEnd, rightEnd) <= 0;
}

/**
 * @summary Is `intervalLeft` fully contained within `intervalRight`?
 *
 * @description
 * Is `intervalLeft` fully contained within `intervalRight`? Uses the non-strict (⊆) definition:
 * an interval is a subset of an equal interval, and a subset of itself.
 *
 * @param intervalLeft - The interval to check
 * @param intervalRight - The interval that might contain `intervalLeft`
 *
 * @returns Whether `intervalLeft` is fully contained within `intervalRight`
 *
 * @example
 * isIntervalSubset(
 *   { start: new Date(2014, 0, 12), end: new Date(2014, 0, 18) },
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) }
 * )
 * //=> true
 *
 * @example
 * // Equal intervals are subsets of each other (non-strict ⊆).
 * isIntervalSubset(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) }
 * )
 * //=> true
 */
export function isIntervalSubset(
  intervalLeft: Interval<Date>,
  intervalRight: Interval<Date>
): boolean;
/**
 * @summary Is `intervalLeft` fully contained within `intervalRight`?
 *
 * @description
 * Is `intervalLeft` fully contained within `intervalRight`? Uses the non-strict (⊆) definition:
 * an interval is a subset of an equal interval, and a subset of itself.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `intervalLeft`/`intervalRight`, which must share the
 * same concrete type.
 *
 * @param intervalLeft - The interval to check
 * @param intervalRight - The interval that might contain `intervalLeft`
 *
 * @returns Whether `intervalLeft` is fully contained within `intervalRight`
 *
 * @example
 * isIntervalSubset(
 *   { start: new Date(2014, 0, 12), end: new Date(2014, 0, 18) },
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) }
 * )
 * //=> true
 *
 * @example
 * // Equal intervals are subsets of each other (non-strict ⊆).
 * isIntervalSubset(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) }
 * )
 * //=> true
 */
export function isIntervalSubset<T extends DateLike>(
  intervalLeft: Interval<T>,
  intervalRight: Interval<T>
): boolean;
export function isIntervalSubset(
  intervalLeft: Interval<Date | DateLike>,
  intervalRight: Interval<Date | DateLike>
): boolean {
  return isIntervalSubsetValue(intervalLeft, intervalRight);
}
