import { DateLike } from "./types.js";

//#region src/is-this-year.d.ts
/**
 * @summary Is the given date in the same year as the current date?
 *
 * @description
 * Is the given date in the same year as the current date?
 *
 * @param date - The date to check
 *
 * @returns The date is in this year
 *
 * @example
 * // If today is 25 September 2014, is 2 July 2014 in this year?
 * const result = isThisYear(new Date(2014, 6, 2))
 * //=> true
 */
declare function isThisYear(date: Date | DateLike): boolean;
//#endregion
export { isThisYear };
//# sourceMappingURL=is-this-year.d.ts.map