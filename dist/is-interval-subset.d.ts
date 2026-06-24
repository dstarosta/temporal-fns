import { DateLike, Interval } from "./types.js";

//#region src/is-interval-subset.d.ts
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
declare function isIntervalSubset(intervalLeft: Interval<Date>, intervalRight: Interval<Date>): boolean;
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
declare function isIntervalSubset<T extends DateLike>(intervalLeft: Interval<T>, intervalRight: Interval<T>): boolean;
//#endregion
export { isIntervalSubset };
//# sourceMappingURL=is-interval-subset.d.ts.map