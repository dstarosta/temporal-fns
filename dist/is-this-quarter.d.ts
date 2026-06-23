import { DateLike } from "./types.js";

//#region src/is-this-quarter.d.ts
/**
 * @summary Is the given date in the same quarter as the current date?
 *
 * @description
 * Is the given date in the same quarter as the current date?
 *
 * @param date - The date to check
 *
 * @returns The date is in this quarter
 *
 * @example
 * // If today is 25 September 2014, is 2 July 2014 in this quarter?
 * const result = isThisQuarter(new Date(2014, 6, 2))
 * //=> true
 */
declare function isThisQuarter(date: Date | DateLike): boolean;
//#endregion
export { isThisQuarter };
//# sourceMappingURL=is-this-quarter.d.ts.map