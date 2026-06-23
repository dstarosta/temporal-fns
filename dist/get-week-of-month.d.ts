import { DateLike } from "./types.js";
import { LocalWeekOptions } from "./helpers/local-week.js";

//#region src/get-week-of-month.d.ts
/**
 * @summary Get the week of the month of the given date.
 *
 * @description
 * Get the week of the month of the given date.
 *
 * @param date - The given date
 * @param options - An object with options
 *
 * @returns The week of month
 *
 * @example
 * // Which week of the month is 9 November 2017?
 * const result = getWeekOfMonth(new Date(2017, 10, 9))
 * //=> 2
 */
declare function getWeekOfMonth(date: Date, options?: LocalWeekOptions): number;
declare function getWeekOfMonth(date: DateLike, options?: LocalWeekOptions): number;
//#endregion
export { getWeekOfMonth };
//# sourceMappingURL=get-week-of-month.d.ts.map