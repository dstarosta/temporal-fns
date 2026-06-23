import { TimeLike } from "./types.js";

//#region src/is-this-minute.d.ts
/**
 * @summary Is the given date in the same minute as the current date?
 *
 * @description
 * Is the given date in the same minute as the current date?
 *
 * @param date - The date to check
 *
 * @returns The date is in this minute
 *
 * @example
 * // If now is 25 September 2014 18:30:15.500,
 * // is 25 September 2014 18:30:00 in this minute?
 * const result = isThisMinute(new Date(2014, 8, 25, 18, 30))
 * //=> true
 */
declare function isThisMinute(date: Date | TimeLike): boolean;
//#endregion
export { isThisMinute };
//# sourceMappingURL=is-this-minute.d.ts.map