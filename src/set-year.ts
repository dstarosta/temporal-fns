import { withDate } from './helpers/convert.js';
import { type DateLike } from './types.js';

// date-fns setYear (via JS Date#setFullYear) overflows into the next month
// when the day doesn't exist in the target year (e.g. Feb 29 set to a
// non-leap year becomes Mar 1), rather than clamping to Feb 28.
/**
 * @summary Set the year to the given date.
 *
 * @description
 * Set the year to the given date.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param year - The year of the new date
 *
 * @returns The new date with the year set
 */
export function setYearValue<T extends DateLike>(date: T, year: number): T {
  const firstOfMonth = date.with({ year, month: 1, day: 1 });
  return firstOfMonth.add({ months: date.month - 1 }).add({ days: date.day - 1 }) as T;
}

/**
 * @summary Set the year to the given date.
 *
 * @description
 * Set the year to the given date.
 *
 * @param date - The date to be changed
 * @param year - The year of the new date
 *
 * @returns The new date with the year set
 *
 * @example
 * // Set year 2013 to 1 September 2014:
 * const result = setYear(new Date(2014, 8, 1), 2013)
 * //=> Sun Sep 01 2013 00:00:00
 */
export function setYear(date: Date, year: number): Date;
/**
 * @summary Set the year to the given date.
 *
 * @description
 * Set the year to the given date.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param year - The year of the new date
 *
 * @returns The new date with the year set
 *
 * @example
 * // Set year 2013 to 1 September 2014:
 * const result = setYear(new Date(2014, 8, 1), 2013)
 * //=> Sun Sep 01 2013 00:00:00
 */
export function setYear<T extends DateLike>(date: T, year: number): T;
export function setYear(date: Date | DateLike, year: number): Date | DateLike {
  if (date instanceof Date) {
    return withDate(date, (dateTime) => setYearValue(dateTime, year));
  }
  return setYearValue(date, year);
}
