import { withDate } from './helpers/convert.js';
import { type DateLike } from './types.js';

// date-fns setDayOfYear resets to January, then overflows via setDate
// semantics (day offsets beyond the month's length roll into later months).
function setDayOfYearValue<T extends DateLike>(date: T, dayOfYear: number): T {
  const januaryFirst = date.with({ month: 1, day: 1 });
  return januaryFirst.add({ days: dayOfYear - 1 }) as T;
}

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
export function setDayOfYear(date: Date, dayOfYear: number): Date;
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
export function setDayOfYear<T extends DateLike>(date: T, dayOfYear: number): T;
export function setDayOfYear(date: Date | DateLike, dayOfYear: number): Date | DateLike {
  if (date instanceof Date) {
    return withDate(date, (dateTime) => setDayOfYearValue(dateTime, dayOfYear));
  }
  return setDayOfYearValue(date, dayOfYear);
}
