import { DateLike } from "./types.js";

//#region src/is-yesterday.d.ts
/**
 * @summary Is the given date yesterday?
 *
 * @description
 * Is the given date yesterday?
 *
 * @param date - The date to check
 *
 * @returns The date is yesterday
 *
 * @example
 * // If today is 6 October 2014, is 5 October 14:00:00 yesterday?
 * const result = isYesterday(new Date(2014, 9, 5, 14, 0))
 * //=> true
 */
declare function isYesterday(date: Date | DateLike): boolean;
//#endregion
export { isYesterday };
//# sourceMappingURL=is-yesterday.d.ts.map