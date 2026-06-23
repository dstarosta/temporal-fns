import { DateLike } from "./types.js";

//#region src/get-month.d.ts
/**
 * @summary Get the month of the given date.
 *
 * @description
 * Get the month of the given date.
 *
 * @param date - The given date
 *
 * @returns The month index (0-11)
 *
 * @example
 * // Which month is 29 February 2012?
 * const result = getMonth(new Date(2012, 1, 29))
 * //=> 1
 */
declare function getMonth(date: Date): number;
declare function getMonth(date: DateLike): number;
//#endregion
export { getMonth };
//# sourceMappingURL=get-month.d.ts.map