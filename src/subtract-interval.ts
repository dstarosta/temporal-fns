import { compare } from './helpers/compare.js';
import { type DateLike, type Interval } from './types.js';

function normalize<T extends Date | DateLike>(interval: Interval<T>): [T, T] {
  return compare(interval.start, interval.end) <= 0
    ? [interval.start, interval.end]
    : [interval.end, interval.start];
}

/**
 * @summary Get the parts of an interval not covered by another interval.
 *
 * @description
 * Get the parts of `intervalLeft` not covered by `intervalRight`. Returns an empty array if
 * `intervalRight` fully covers `intervalLeft`, an array with one interval if `intervalRight`
 * doesn't overlap `intervalLeft` at all (the original interval, unchanged) or only overlaps one
 * end of it, or an array with two intervals if `intervalRight` is fully contained within
 * `intervalLeft` (splitting it into a "before" and "after" part).
 *
 * @param intervalLeft - The interval to subtract from
 * @param intervalRight - The interval to subtract
 *
 * @returns The parts of `intervalLeft` not covered by `intervalRight`
 *
 * @example
 * // intervalRight fully contained within intervalLeft: splits into two parts.
 * subtractInterval(
 *   { start: new Date(2014, 0, 1), end: new Date(2014, 0, 31) },
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) }
 * )
 * //=> [
 * //   { start: Wed Jan 01 2014, end: Fri Jan 10 2014 },
 * //   { start: Mon Jan 20 2014, end: Fri Jan 31 2014 }
 * // ]
 *
 * @example
 * // intervalRight fully covers intervalLeft: nothing remains.
 * subtractInterval(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 1), end: new Date(2014, 0, 31) }
 * )
 * //=> []
 */
export function subtractInterval(
  intervalLeft: Interval<Date>,
  intervalRight: Interval<Date>
): Interval<Date>[];
/**
 * @summary Get the parts of an interval not covered by another interval.
 *
 * @description
 * Get the parts of `intervalLeft` not covered by `intervalRight`. Returns an empty array if
 * `intervalRight` fully covers `intervalLeft`, an array with one interval if `intervalRight`
 * doesn't overlap `intervalLeft` at all (the original interval, unchanged) or only overlaps one
 * end of it, or an array with two intervals if `intervalRight` is fully contained within
 * `intervalLeft` (splitting it into a "before" and "after" part).
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `intervalLeft`/`intervalRight`, which must share the
 * same concrete type.
 *
 * @param intervalLeft - The interval to subtract from
 * @param intervalRight - The interval to subtract
 *
 * @returns The parts of `intervalLeft` not covered by `intervalRight`
 *
 * @example
 * // intervalRight fully contained within intervalLeft: splits into two parts.
 * subtractInterval(
 *   { start: new Date(2014, 0, 1), end: new Date(2014, 0, 31) },
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) }
 * )
 * //=> [
 * //   { start: Wed Jan 01 2014, end: Fri Jan 10 2014 },
 * //   { start: Mon Jan 20 2014, end: Fri Jan 31 2014 }
 * // ]
 *
 * @example
 * // intervalRight fully covers intervalLeft: nothing remains.
 * subtractInterval(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 1), end: new Date(2014, 0, 31) }
 * )
 * //=> []
 */
export function subtractInterval<T extends DateLike>(
  intervalLeft: Interval<T>,
  intervalRight: Interval<T>
): Interval<T>[];
export function subtractInterval(
  intervalLeft: Interval<Date | DateLike>,
  intervalRight: Interval<Date | DateLike>
): Interval<Date | DateLike>[] {
  const [leftStart, leftEnd] = normalize(intervalLeft);
  const [rightStart, rightEnd] = normalize(intervalRight);

  // No overlap at all: intervalLeft is untouched.
  if (compare(rightEnd, leftStart) <= 0 || compare(rightStart, leftEnd) >= 0) {
    return [{ start: leftStart, end: leftEnd }];
  }

  const result: Interval<Date | DateLike>[] = [];

  // A part remains before intervalRight starts.
  if (compare(rightStart, leftStart) > 0) {
    result.push({ start: leftStart, end: rightStart });
  }

  // A part remains after intervalRight ends.
  if (compare(rightEnd, leftEnd) < 0) {
    result.push({ start: rightEnd, end: leftEnd });
  }

  return result;
}
