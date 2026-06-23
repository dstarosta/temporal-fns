import { DateLike } from "./types.js";

//#region src/get-day.d.ts
/**
 * @summary Get the day of the week of the given date.
 *
 * @description
 * Get the day of the week of the given date.
 *
 * @param date - The given date
 *
 * @returns The day of week, 0 represents Sunday
 *
 * @example
 * // Which day of the week is 29 February 2012?
 * const result = getDay(new Date(2012, 1, 29))
 * //=> 3
 */
declare function getDay(date: Date): number;
declare function getDay(date: DateLike): number;
//#endregion
export { getDay };
//# sourceMappingURL=get-day.d.ts.map