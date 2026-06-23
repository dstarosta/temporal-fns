import { DateLike } from "./types.js";

//#region src/get-days-in-month.d.ts
/**
 * @summary Get the number of days in a month of the given date.
 *
 * @description
 * Get the number of days in a month of the given date.
 *
 * @param date - The given date
 *
 * @returns The number of days in a month
 *
 * @example
 * // How many days are in February 2000?
 * const result = getDaysInMonth(new Date(2000, 1))
 * //=> 29
 */
declare function getDaysInMonth(date: Date): number;
declare function getDaysInMonth(date: DateLike): number;
//#endregion
export { getDaysInMonth };
//# sourceMappingURL=get-days-in-month.d.ts.map