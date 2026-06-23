import { DateLike } from "./types.js";

//#region src/min.d.ts
/**
 * @summary Returns the earliest of the given dates.
 *
 * @description
 * Returns the earliest of the given dates.
 *
 * @param dates - The dates to compare
 *
 * @returns The earliest of the dates
 *
 * @throws `RangeError` when `dates` is empty.
 *
 * @example
 * // Which of these dates is the earliest?
 * const result = min([
 *   new Date(1989, 6, 10),
 *   new Date(1987, 1, 11),
 *   new Date(1995, 6, 2),
 *   new Date(1990, 0, 1)
 * ])
 * //=> Wed Feb 11 1987 00:00:00
 */
declare function min(dates: readonly Date[]): Date;
/**
 * @summary Returns the earliest of the given dates.
 *
 * @description
 * Returns the earliest of the given dates.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `dates`; the result has the same concrete type.
 *
 * @param dates - The dates to compare
 *
 * @returns The earliest of the dates
 *
 * @throws `RangeError` when `dates` is empty.
 *
 * @example
 * // Which of these dates is the earliest?
 * const result = min([
 *   new Date(1989, 6, 10),
 *   new Date(1987, 1, 11),
 *   new Date(1995, 6, 2),
 *   new Date(1990, 0, 1)
 * ])
 * //=> Wed Feb 11 1987 00:00:00
 */
declare function min<T extends DateLike>(dates: readonly T[]): T;
//#endregion
export { min };
//# sourceMappingURL=min.d.ts.map