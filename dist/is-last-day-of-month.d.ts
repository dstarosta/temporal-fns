import { DateLike } from "./types.js";

//#region src/is-last-day-of-month.d.ts
/**
 * @summary Is the given date the last day of a month?
 *
 * @description
 * Is the given date the last day of a month?
 *
 * @param date - The date to check
 *
 * @returns The date is the last day of a month
 *
 * @example
 * // Is 28 February 2014 the last day of a month?
 * const result = isLastDayOfMonth(new Date(2014, 1, 28))
 * //=> true
 */
declare function isLastDayOfMonth(date: Date): boolean;
declare function isLastDayOfMonth(date: DateLike): boolean;
//#endregion
export { isLastDayOfMonth };
//# sourceMappingURL=is-last-day-of-month.d.ts.map