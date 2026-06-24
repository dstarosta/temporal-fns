import { compare } from './helpers/compare.js';
import { type DateLike, type Interval } from './types.js';

function normalize<T extends Date | DateLike>(interval: Interval<T>): [T, T] {
  return compare(interval.start, interval.end) <= 0
    ? [interval.start, interval.end]
    : [interval.end, interval.start];
}

/**
 * @summary Does one interval's end exactly touch the other's start, with no gap and no overlap?
 *
 * @description
 * Does one interval's end exactly touch the other's start, with no gap and no overlap? This is
 * the exact boundary case `areIntervalsOverlapping` excludes by default (non-inclusive) — these
 * two functions are complementary, not equivalent: two intervals can be neither overlapping nor
 * adjacent (a real gap between them).
 *
 * @param intervalLeft - The first interval
 * @param intervalRight - The second interval
 *
 * @returns Whether `intervalLeft` and `intervalRight` touch at exactly one boundary
 *
 * @example
 * areIntervalsAdjacent(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 20), end: new Date(2014, 0, 30) }
 * )
 * //=> true
 *
 * @example
 * // A gap, however small, is not adjacent.
 * areIntervalsAdjacent(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 21), end: new Date(2014, 0, 30) }
 * )
 * //=> false
 */
export function areIntervalsAdjacent(
  intervalLeft: Interval<Date>,
  intervalRight: Interval<Date>
): boolean;
/**
 * @summary Does one interval's end exactly touch the other's start, with no gap and no overlap?
 *
 * @description
 * Does one interval's end exactly touch the other's start, with no gap and no overlap? This is
 * the exact boundary case `areIntervalsOverlapping` excludes by default (non-inclusive) — these
 * two functions are complementary, not equivalent: two intervals can be neither overlapping nor
 * adjacent (a real gap between them).
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `intervalLeft`/`intervalRight`, which must share the
 * same concrete type.
 *
 * @param intervalLeft - The first interval
 * @param intervalRight - The second interval
 *
 * @returns Whether `intervalLeft` and `intervalRight` touch at exactly one boundary
 *
 * @example
 * areIntervalsAdjacent(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 20), end: new Date(2014, 0, 30) }
 * )
 * //=> true
 *
 * @example
 * // A gap, however small, is not adjacent.
 * areIntervalsAdjacent(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 21), end: new Date(2014, 0, 30) }
 * )
 * //=> false
 */
export function areIntervalsAdjacent<T extends DateLike>(
  intervalLeft: Interval<T>,
  intervalRight: Interval<T>
): boolean;
export function areIntervalsAdjacent(
  intervalLeft: Interval<Date | DateLike>,
  intervalRight: Interval<Date | DateLike>
): boolean {
  const [leftStart, leftEnd] = normalize(intervalLeft);
  const [rightStart, rightEnd] = normalize(intervalRight);

  return compare(leftEnd, rightStart) === 0 || compare(rightEnd, leftStart) === 0;
}
