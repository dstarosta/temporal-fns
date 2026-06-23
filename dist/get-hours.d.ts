import { TimeLike } from "./types.js";

//#region src/get-hours.d.ts
/**
 * @summary Get the hours of the given date.
 *
 * @description
 * Get the hours of the given date.
 *
 * @param date - The given date
 *
 * @returns The hours
 *
 * @example
 * // Get the hours of 29 February 2012 11:45:00:
 * const result = getHours(new Date(2012, 1, 29, 11, 45))
 * //=> 11
 */
declare function getHours(date: Date): number;
declare function getHours(date: TimeLike): number;
//#endregion
export { getHours };
//# sourceMappingURL=get-hours.d.ts.map