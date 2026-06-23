import { TimeLike } from "./types.js";

//#region src/is-this-hour.d.ts
/**
 * @summary Is the given date in the same hour as the current date?
 *
 * @description
 * Is the given date in the same hour as the current date?
 *
 * @param date - The date to check
 *
 * @returns The date is in this hour
 *
 * @example
 * // If now is 25 September 2014 18:30:15.500,
 * // is 25 September 2014 18:00:00 in this hour?
 * const result = isThisHour(new Date(2014, 8, 25, 18))
 * //=> true
 */
declare function isThisHour(date: Date | TimeLike): boolean;
//#endregion
export { isThisHour };
//# sourceMappingURL=is-this-hour.d.ts.map