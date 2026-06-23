import { DateLike } from "./types.js";

//#region src/difference-in-calendar-quarters.d.ts
/**
 * @summary Get the number of calendar quarters between the given dates.
 *
 * @description
 * Get the number of calendar quarters between the given dates.
 *
 * @param a - The later date
 * @param b - The earlier date
 *
 * @returns The number of calendar quarters
 *
 * @example
 * // How many calendar quarters are between 31 December 2013 and 2 July 2014?
 * const result = differenceInCalendarQuarters(
 *   new Date(2014, 6, 2),
 *   new Date(2013, 11, 31)
 * )
 * //=> 3
 */
declare function differenceInCalendarQuarters(a: Date, b: Date): number;
/**
 * @summary Get the number of calendar quarters between the given dates.
 *
 * @description
 * Get the number of calendar quarters between the given dates.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `a`/`b`; both arguments must share the same concrete type.
 *
 * @param a - The later date
 * @param b - The earlier date
 *
 * @returns The number of calendar quarters
 *
 * @example
 * // How many calendar quarters are between 31 December 2013 and 2 July 2014?
 * const result = differenceInCalendarQuarters(
 *   new Date(2014, 6, 2),
 *   new Date(2013, 11, 31)
 * )
 * //=> 3
 */
declare function differenceInCalendarQuarters<T extends DateLike>(a: T, b: T): number;
//#endregion
export { differenceInCalendarQuarters };
//# sourceMappingURL=difference-in-calendar-quarters.d.ts.map