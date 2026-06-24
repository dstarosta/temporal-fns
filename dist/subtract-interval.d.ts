import { DateLike, Interval } from "./types.js";

//#region src/subtract-interval.d.ts
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
declare function subtractInterval(intervalLeft: Interval<Date>, intervalRight: Interval<Date>): Interval<Date>[];
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
declare function subtractInterval<T extends DateLike>(intervalLeft: Interval<T>, intervalRight: Interval<T>): Interval<T>[];
//#endregion
export { subtractInterval };
//# sourceMappingURL=subtract-interval.d.ts.map