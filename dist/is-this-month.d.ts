import { DateLike } from "./types.js";

//#region src/is-this-month.d.ts
/**
 * @summary Is the given date in the same month as the current date?
 *
 * @description
 * Is the given date in the same month as the current date?
 *
 * @param date - The date to check
 *
 * @returns The date is in this month
 *
 * @example
 * // If today is 25 September 2014, is 15 September 2014 in this month?
 * const result = isThisMonth(new Date(2014, 8, 15))
 * //=> true
 */
declare function isThisMonth(date: Date | DateLike): boolean;
//#endregion
export { isThisMonth };
//# sourceMappingURL=is-this-month.d.ts.map