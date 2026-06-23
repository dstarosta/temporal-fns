import { DateLike } from "./types.js";

//#region src/get-iso-weeks-in-year.d.ts
/**
 * @summary Get the number of weeks in an ISO week-numbering year of the given date.
 *
 * @description
 * Get the number of weeks in an ISO week-numbering year of the given date.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param date - The given date
 *
 * @returns The number of ISO weeks in a year
 *
 * @example
 * // How many weeks are in ISO week-numbering year 2015?
 * const result = getISOWeeksInYear(new Date(2015, 1, 11))
 * //=> 53
 */
declare function getISOWeeksInYear(date: Date): number;
declare function getISOWeeksInYear(date: DateLike): number;
//#endregion
export { getISOWeeksInYear };
//# sourceMappingURL=get-iso-weeks-in-year.d.ts.map