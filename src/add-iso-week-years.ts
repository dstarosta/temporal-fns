import { setISOWeekYearValue } from './set-iso-week-year.js';
import { getISOWeekYearValue } from './helpers/iso-week.js';
import { type DateLike } from './types.js';

/**
 * @summary Add the specified number of ISO week-numbering years to the given date.
 *
 * @description
 * Add the specified number of ISO week-numbering years to the given date.
 *
 * Untyped variant of {@link addISOWeekYears} that accepts and returns the `Date | DateLike` union
 * directly, without the overloaded type narrowing.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param date - The date to be changed
 * @param amount - The amount of ISO week-numbering years to be added.
 *
 * @returns The new date with the ISO week-numbering years added
 */
export function addISOWeekYearsValue(date: Date | DateLike, amount: number): Date | DateLike {
  return setISOWeekYearValue(date, getISOWeekYearValue(date) + amount);
}

/**
 * @summary Add the specified number of ISO week-numbering years to the given date.
 *
 * @description
 * Add the specified number of ISO week-numbering years to the given date.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param date - The date to be changed
 * @param amount - The amount of ISO week-numbering years to be added.
 *
 * @returns The new date with the ISO week-numbering years added
 *
 * @example
 * // Add 5 ISO week-numbering years to 2 July 2010:
 * const result = addISOWeekYears(new Date(2010, 6, 2), 5)
 * //=> Fri Jun 26 2015 00:00:00
 */
export function addISOWeekYears(date: Date, amount: number): Date;
/**
 * @summary Add the specified number of ISO week-numbering years to the given date.
 *
 * @description
 * Add the specified number of ISO week-numbering years to the given date.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param amount - The amount of ISO week-numbering years to be added.
 *
 * @returns The new date with the ISO week-numbering years added
 *
 * @example
 * // Add 5 ISO week-numbering years to 2 July 2010:
 * const result = addISOWeekYears(new Date(2010, 6, 2), 5)
 * //=> Fri Jun 26 2015 00:00:00
 */
export function addISOWeekYears<T extends DateLike>(date: T, amount: number): T;
export function addISOWeekYears(date: Date | DateLike, amount: number): Date | DateLike {
  return addISOWeekYearsValue(date, amount);
}
