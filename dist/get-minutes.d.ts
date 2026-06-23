import { TimeLike } from "./types.js";

//#region src/get-minutes.d.ts
/**
 * @summary Get the minutes of the given date.
 *
 * @description
 * Get the minutes of the given date.
 *
 * @param date - The given date
 *
 * @returns The minutes
 *
 * @example
 * // Get the minutes of 29 February 2012 11:45:05:
 * const result = getMinutes(new Date(2012, 1, 29, 11, 45, 5))
 * //=> 45
 */
declare function getMinutes(date: Date): number;
declare function getMinutes(date: TimeLike): number;
//#endregion
export { getMinutes };
//# sourceMappingURL=get-minutes.d.ts.map