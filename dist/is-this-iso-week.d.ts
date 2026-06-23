import { DateLike } from "./types.js";

//#region src/is-this-iso-week.d.ts
/**
 * @summary Is the given date in the same ISO week as the current date?
 *
 * @description
 * Is the given date in the same ISO week as the current date?
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param date - The date to check
 *
 * @returns The date is in this ISO week
 *
 * @example
 * // If today is 25 September 2014, is 22 September 2014 in this ISO week?
 * const result = isThisISOWeek(new Date(2014, 8, 22))
 * //=> true
 */
declare function isThisISOWeek(date: Date | DateLike): boolean;
//#endregion
export { isThisISOWeek };
//# sourceMappingURL=is-this-iso-week.d.ts.map