import { DateLike } from "./types.js";

//#region src/get-days-in-year.d.ts
/**
 * @summary Get the number of days in a year of the given date.
 *
 * @description
 * Get the number of days in a year of the given date.
 *
 * @param date - The given date
 *
 * @returns The number of days in a year
 *
 * @example
 * // How many days are in 2012?
 * const result = getDaysInYear(new Date(2012, 0, 1))
 * //=> 366
 */
declare function getDaysInYear(date: Date): number;
declare function getDaysInYear(date: DateLike): number;
//#endregion
export { getDaysInYear };
//# sourceMappingURL=get-days-in-year.d.ts.map