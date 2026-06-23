import { TimeLike } from "./types.js";

//#region src/is-this-second.d.ts
/**
 * @summary Is the given date in the same second as the current date?
 *
 * @description
 * Is the given date in the same second as the current date?
 *
 * @param date - The date to check
 *
 * @returns The date is in this second
 *
 * @example
 * // If now is 25 September 2014 18:30:15.500,
 * // is 25 September 2014 18:30:15.000 in this second?
 * const result = isThisSecond(new Date(2014, 8, 25, 18, 30, 15))
 * //=> true
 */
declare function isThisSecond(date: Date | TimeLike): boolean;
//#endregion
export { isThisSecond };
//# sourceMappingURL=is-this-second.d.ts.map