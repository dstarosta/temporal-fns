import { DateLike } from "./types.js";

//#region src/is-tomorrow.d.ts
/**
 * @summary Is the given date tomorrow?
 *
 * @description
 * Is the given date tomorrow?
 *
 * @param date - The date to check
 *
 * @returns The date is tomorrow
 *
 * @example
 * // If today is 6 October 2014, is 7 October 14:00:00 tomorrow?
 * const result = isTomorrow(new Date(2014, 9, 7, 14, 0))
 * //=> true
 */
declare function isTomorrow(date: Date | DateLike): boolean;
//#endregion
export { isTomorrow };
//# sourceMappingURL=is-tomorrow.d.ts.map