import { DateLike } from "./types.js";

//#region src/get-date.d.ts
/**
 * @summary Get the day of the month of the given date.
 *
 * @description
 * Get the day of the month of the given date.
 *
 * @param date - The given date
 *
 * @returns The day of month
 *
 * @example
 * // Which day of the month is 29 February 2012?
 * const result = getDate(new Date(2012, 1, 29))
 * //=> 29
 */
declare function getDate(date: Date): number;
declare function getDate(date: DateLike): number;
//#endregion
export { getDate };
//# sourceMappingURL=get-date.d.ts.map