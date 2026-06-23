import { DateLike } from "./types.js";

//#region src/difference-in-calendar-months.d.ts
/**
 * @summary Get the number of calendar months between the given dates.
 *
 * @description
 * Get the number of calendar months between the given dates.
 *
 * @param a - The later date
 * @param b - The earlier date
 *
 * @returns The number of calendar months
 *
 * @example
 * // How many calendar months are between 31 January 2014 and 1 September 2014?
 * const result = differenceInCalendarMonths(
 *   new Date(2014, 8, 1),
 *   new Date(2014, 0, 31)
 * )
 * //=> 8
 */
declare function differenceInCalendarMonths(a: Date, b: Date): number;
/**
 * @summary Get the number of calendar months between the given dates.
 *
 * @description
 * Get the number of calendar months between the given dates.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `a`/`b`; both arguments must share the same concrete type.
 *
 * @param a - The later date
 * @param b - The earlier date
 *
 * @returns The number of calendar months
 *
 * @example
 * // How many calendar months are between 31 January 2014 and 1 September 2014?
 * const result = differenceInCalendarMonths(
 *   new Date(2014, 8, 1),
 *   new Date(2014, 0, 31)
 * )
 * //=> 8
 */
declare function differenceInCalendarMonths<T extends DateLike>(a: T, b: T): number;
//#endregion
export { differenceInCalendarMonths };
//# sourceMappingURL=difference-in-calendar-months.d.ts.map