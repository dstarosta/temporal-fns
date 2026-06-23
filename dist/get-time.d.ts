import { DateLike } from "./types.js";

//#region src/get-time.d.ts
/**
 * @summary Get the milliseconds timestamp of the given date.
 *
 * @description
 * Get the milliseconds timestamp of the given date.
 *
 * @param date - The given date
 *
 * @returns The timestamp
 *
 * @example
 * // Get the timestamp of 29 February 2012 11:45:05.123:
 * const result = getTime(new Date(2012, 1, 29, 11, 45, 5, 123))
 * //=> 1330515905123
 */
declare function getTime(date: Date): number;
declare function getTime(date: DateLike): number;
//#endregion
export { getTime };
//# sourceMappingURL=get-time.d.ts.map