import { DateLike } from "./types.js";

//#region src/is-first-day-of-month.d.ts
/**
 * @summary Is the given date the first day of a month?
 *
 * @description
 * Is the given date the first day of a month?
 *
 * @param date - The date to check
 *
 * @returns The date is the first day of a month
 *
 * @example
 * // Is 1 September 2014 the first day of a month?
 * const result = isFirstDayOfMonth(new Date(2014, 8, 1))
 * //=> true
 */
declare function isFirstDayOfMonth(date: Date): boolean;
declare function isFirstDayOfMonth(date: DateLike): boolean;
//#endregion
export { isFirstDayOfMonth };
//# sourceMappingURL=is-first-day-of-month.d.ts.map