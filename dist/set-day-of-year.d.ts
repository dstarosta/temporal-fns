import { DateLike } from "./types.js";

//#region src/set-day-of-year.d.ts
/**
 * @summary Set the day of the year to the given date.
 *
 * @description
 * Set the day of the year to the given date.
 *
 * @param date - The date to be changed
 * @param dayOfYear - The day of the year of the new date
 *
 * @returns The new date with the day of the year set
 *
 * @example
 * // Set the 2nd day of the year to 2 July 2014:
 * const result = setDayOfYear(new Date(2014, 6, 2), 2)
 * //=> Thu Jan 02 2014 00:00:00
 */
declare function setDayOfYear(date: Date, dayOfYear: number): Date;
/**
 * @summary Set the day of the year to the given date.
 *
 * @description
 * Set the day of the year to the given date.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param dayOfYear - The day of the year of the new date
 *
 * @returns The new date with the day of the year set
 *
 * @example
 * // Set the 2nd day of the year to 2 July 2014:
 * const result = setDayOfYear(new Date(2014, 6, 2), 2)
 * //=> Thu Jan 02 2014 00:00:00
 */
declare function setDayOfYear<T extends DateLike>(date: T, dayOfYear: number): T;
//#endregion
export { setDayOfYear };
//# sourceMappingURL=set-day-of-year.d.ts.map