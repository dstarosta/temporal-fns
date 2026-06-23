import { TimeLike } from "./types.js";

//#region src/get-milliseconds.d.ts
/**
 * @summary Get the milliseconds of the given date.
 *
 * @description
 * Get the milliseconds of the given date.
 *
 * @param date - The given date
 *
 * @returns The milliseconds
 *
 * @example
 * // Get the milliseconds of 29 February 2012 11:45:05.123:
 * const result = getMilliseconds(new Date(2012, 1, 29, 11, 45, 5, 123))
 * //=> 123
 */
declare function getMilliseconds(date: Date): number;
declare function getMilliseconds(date: TimeLike): number;
//#endregion
export { getMilliseconds };
//# sourceMappingURL=get-milliseconds.d.ts.map