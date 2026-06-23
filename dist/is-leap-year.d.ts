import { DateLike } from "./types.js";

//#region src/is-leap-year.d.ts
/**
 * @summary Is the given date in the leap year?
 *
 * @description
 * Is the given date in the leap year?
 *
 * @param date - The date to check
 *
 * @returns The date is in the leap year
 *
 * @example
 * // Is 1 September 2012 in the leap year?
 * const result = isLeapYear(new Date(2012, 8, 1))
 * //=> true
 */
declare function isLeapYear(date: Date): boolean;
declare function isLeapYear(date: DateLike): boolean;
//#endregion
export { isLeapYear };
//# sourceMappingURL=is-leap-year.d.ts.map