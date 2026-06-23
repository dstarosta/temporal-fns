import { DateLike } from "./types.js";

//#region src/get-iso-day.d.ts
/**
 * @summary Get the day of the ISO week of the given date.
 *
 * @description
 * Get the day of the ISO week of the given date, which is 7 for Sunday, 1 for Monday etc.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param date - The given date
 *
 * @returns The day of ISO week
 *
 * @example
 * // Which day of the ISO week is 26 February 2012?
 * const result = getISODay(new Date(2012, 1, 26))
 * //=> 7
 */
declare function getISODay(date: Date): number;
declare function getISODay(date: DateLike): number;
//#endregion
export { getISODay };
//# sourceMappingURL=get-iso-day.d.ts.map