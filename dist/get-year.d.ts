import { DateLike } from "./types.js";

//#region src/get-year.d.ts
/**
 * @summary Get the year of the given date.
 *
 * @description
 * Get the year of the given date.
 *
 * @param date - The given date
 *
 * @returns The year
 *
 * @example
 * // Which year is 2 July 2014?
 * const result = getYear(new Date(2014, 6, 2))
 * //=> 2014
 */
declare function getYear(date: Date): number;
declare function getYear(date: DateLike): number;
//#endregion
export { getYear };
//# sourceMappingURL=get-year.d.ts.map