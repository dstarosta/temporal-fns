import { DateLike } from "./types.js";

//#region src/get-day-of-year.d.ts
/**
 * @summary Get the day of the year of the given date.
 *
 * @description
 * Get the day of the year of the given date.
 *
 * @param date - The given date
 *
 * @returns The day of year
 *
 * @example
 * // Which day of the year is 2 July 2014?
 * const result = getDayOfYear(new Date(2014, 6, 2))
 * //=> 183
 */
declare function getDayOfYear(date: Date): number;
declare function getDayOfYear(date: DateLike): number;
//#endregion
export { getDayOfYear };
//# sourceMappingURL=get-day-of-year.d.ts.map