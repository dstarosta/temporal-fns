import { DateLike, Interval } from "./types.js";

//#region src/is-interval-empty.d.ts
/**
 * @summary Is the given interval empty (its start equals its end)?
 *
 * @description
 * Is the given interval empty (its start equals its end)?
 *
 * @param interval - The interval to check
 *
 * @returns Whether the interval's `start` equals its `end`
 *
 * @example
 * isIntervalEmpty({ start: new Date(2014, 0, 10), end: new Date(2014, 0, 10) })
 * //=> true
 *
 * @example
 * isIntervalEmpty({ start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) })
 * //=> false
 */
declare function isIntervalEmpty(interval: Interval<Date>): boolean;
/**
 * @summary Is the given interval empty (its start equals its end)?
 *
 * @description
 * Is the given interval empty (its start equals its end)?
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `interval`.
 *
 * @param interval - The interval to check
 *
 * @returns Whether the interval's `start` equals its `end`
 *
 * @example
 * isIntervalEmpty({ start: new Date(2014, 0, 10), end: new Date(2014, 0, 10) })
 * //=> true
 *
 * @example
 * isIntervalEmpty({ start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) })
 * //=> false
 */
declare function isIntervalEmpty<T extends DateLike>(interval: Interval<T>): boolean;
//#endregion
export { isIntervalEmpty };
//# sourceMappingURL=is-interval-empty.d.ts.map