import { DateLike } from "./types.js";

//#region src/get-unix-time.d.ts
/**
 * @summary Get the seconds timestamp of the given date.
 *
 * @description
 * Get the seconds timestamp of the given date.
 *
 * @param date - The given date
 *
 * @returns The timestamp
 *
 * @example
 * // Get the timestamp of 29 February 2012 11:45:05:
 * const result = getUnixTime(new Date(2012, 1, 29, 11, 45, 5))
 * //=> 1330512305
 */
declare function getUnixTime(date: Date): number;
declare function getUnixTime(date: DateLike): number;
//#endregion
export { getUnixTime };
//# sourceMappingURL=get-unix-time.d.ts.map