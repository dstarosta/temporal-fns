import { compare } from './helpers/compare.js';
import { type DateLike, type Interval } from './types.js';

function normalize<T extends Date | DateLike>(interval: Interval<T>): [T, T] {
  return compare(interval.start, interval.end) <= 0
    ? [interval.start, interval.end]
    : [interval.end, interval.start];
}

/**
 * @summary Get the envelope spanning two intervals (the earliest start to the latest end).
 *
 * @description
 * Get the envelope spanning two intervals: an interval from the earliest of the two `start`s to
 * the latest of the two `end`s. Unlike {@link intersectIntervals}, this is always defined, even
 * when the two intervals don't overlap or aren't adjacent — in that case the result also spans
 * the gap between them, which is the standard definition of an interval union/envelope as used by
 * other Temporal-based libraries.
 *
 * @param intervalLeft - The first interval
 * @param intervalRight - The second interval
 *
 * @returns The envelope interval spanning both `intervalLeft` and `intervalRight`
 *
 * @example
 * unionIntervals(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 17), end: new Date(2014, 0, 24) }
 * )
 * //=> { start: Fri Jan 10 2014, end: Fri Jan 24 2014 }
 *
 * @example
 * // Non-overlapping intervals: the result also spans the gap between them.
 * unionIntervals(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 12) },
 *   { start: new Date(2014, 0, 20), end: new Date(2014, 0, 24) }
 * )
 * //=> { start: Fri Jan 10 2014, end: Fri Jan 24 2014 }
 */
export function unionIntervals(
  intervalLeft: Interval<Date>,
  intervalRight: Interval<Date>
): Interval<Date>;
/**
 * @summary Get the envelope spanning two intervals (the earliest start to the latest end).
 *
 * @description
 * Get the envelope spanning two intervals: an interval from the earliest of the two `start`s to
 * the latest of the two `end`s. Unlike {@link intersectIntervals}, this is always defined, even
 * when the two intervals don't overlap or aren't adjacent — in that case the result also spans
 * the gap between them, which is the standard definition of an interval union/envelope as used by
 * other Temporal-based libraries.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `intervalLeft`/`intervalRight`, which must share the
 * same concrete type.
 *
 * @param intervalLeft - The first interval
 * @param intervalRight - The second interval
 *
 * @returns The envelope interval spanning both `intervalLeft` and `intervalRight`
 *
 * @example
 * unionIntervals(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 17), end: new Date(2014, 0, 24) }
 * )
 * //=> { start: Fri Jan 10 2014, end: Fri Jan 24 2014 }
 *
 * @example
 * // Non-overlapping intervals: the result also spans the gap between them.
 * unionIntervals(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 12) },
 *   { start: new Date(2014, 0, 20), end: new Date(2014, 0, 24) }
 * )
 * //=> { start: Fri Jan 10 2014, end: Fri Jan 24 2014 }
 */
export function unionIntervals<T extends DateLike>(
  intervalLeft: Interval<T>,
  intervalRight: Interval<T>
): Interval<T>;
export function unionIntervals(
  intervalLeft: Interval<Date | DateLike>,
  intervalRight: Interval<Date | DateLike>
): Interval<Date | DateLike> {
  const [leftStart, leftEnd] = normalize(intervalLeft);
  const [rightStart, rightEnd] = normalize(intervalRight);

  const start = compare(leftStart, rightStart) <= 0 ? leftStart : rightStart;
  const end = compare(leftEnd, rightEnd) >= 0 ? leftEnd : rightEnd;
  return { start, end };
}
