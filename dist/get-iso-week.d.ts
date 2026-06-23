import { DateLike } from "./types.js";

//#region src/get-iso-week.d.ts
/**
 * @summary Get the ISO week of the given date.
 *
 * @description
 * Get the ISO week of the given date.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param date - The given date
 *
 * @returns The ISO week
 *
 * @example
 * // Which week of the ISO-week numbering year is 2 January 2005?
 * const result = getISOWeek(new Date(2005, 0, 2))
 * //=> 53
 */
declare function getISOWeek(date: Date): number;
declare function getISOWeek(date: DateLike): number;
//#endregion
export { getISOWeek };
//# sourceMappingURL=get-iso-week.d.ts.map