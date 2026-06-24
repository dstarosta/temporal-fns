import { DateLike, Interval } from "./types.js";

//#region src/intersect-intervals.d.ts
/**
 * @summary Get the overlapping sub-interval of two intervals, or `null` if they don't overlap.
 *
 * @description
 * Get the overlapping sub-interval of two intervals, or `null` if they don't overlap. Adjacent
 * intervals (one's end equals the other's start) are not considered overlapping and return
 * `null`, matching {@link areIntervalsOverlapping}'s default (non-inclusive) behavior.
 *
 * @param intervalLeft - The first interval
 * @param intervalRight - The second interval
 *
 * @returns The overlapping sub-interval, or `null` if the intervals don't overlap
 *
 * @example
 * intersectIntervals(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 17), end: new Date(2014, 0, 24) }
 * )
 * //=> { start: Fri Jan 17 2014, end: Mon Jan 20 2014 }
 *
 * @example
 * intersectIntervals(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 21), end: new Date(2014, 0, 24) }
 * )
 * //=> null
 */
declare function intersectIntervals(intervalLeft: Interval<Date>, intervalRight: Interval<Date>): Interval<Date> | null;
/**
 * @summary Get the overlapping sub-interval of two intervals, or `null` if they don't overlap.
 *
 * @description
 * Get the overlapping sub-interval of two intervals, or `null` if they don't overlap. Adjacent
 * intervals (one's end equals the other's start) are not considered overlapping and return
 * `null`, matching {@link areIntervalsOverlapping}'s default (non-inclusive) behavior.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `intervalLeft`/`intervalRight`, which must share the
 * same concrete type.
 *
 * @param intervalLeft - The first interval
 * @param intervalRight - The second interval
 *
 * @returns The overlapping sub-interval, or `null` if the intervals don't overlap
 *
 * @example
 * intersectIntervals(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 17), end: new Date(2014, 0, 24) }
 * )
 * //=> { start: Fri Jan 17 2014, end: Mon Jan 20 2014 }
 *
 * @example
 * intersectIntervals(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 21), end: new Date(2014, 0, 24) }
 * )
 * //=> null
 */
declare function intersectIntervals<T extends DateLike>(intervalLeft: Interval<T>, intervalRight: Interval<T>): Interval<T> | null;
//#endregion
export { intersectIntervals };
//# sourceMappingURL=intersect-intervals.d.ts.map