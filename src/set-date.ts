import { withDate } from './helpers/convert.js';
import { type DateLike } from './types.js';

// date-fns setDate (via JS Date#setDate) overflows into the following
// month(s) when dayOfMonth exceeds the current month's length, rather than
// clamping — e.g. Jan + setDate(31) on a 28-day Feb becomes Mar 2/3.
/**
 * @summary Set the day of the month to the given date.
 *
 * @description
 * Set the day of the month to the given date.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param dayOfMonth - The day of the month of the new date
 *
 * @returns The new date with the day of the month set
 */
export function setDateValue<T extends DateLike>(date: T, dayOfMonth: number): T {
  const firstOfMonth = date.with({ day: 1 });
  return firstOfMonth.add({ days: dayOfMonth - 1 }) as T;
}

/**
 * @summary Set the day of the month to the given date.
 *
 * @description
 * Set the day of the month to the given date.
 *
 * @param date - The date to be changed
 * @param dayOfMonth - The day of the month of the new date
 *
 * @returns The new date with the day of the month set
 *
 * @example
 * // Set the 30th day of the month to 1 September 2014:
 * const result = setDate(new Date(2014, 8, 1), 30)
 * //=> Tue Sep 30 2014 00:00:00
 */
export function setDate(date: Date, dayOfMonth: number): Date;
/**
 * @summary Set the day of the month to the given date.
 *
 * @description
 * Set the day of the month to the given date.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param dayOfMonth - The day of the month of the new date
 *
 * @returns The new date with the day of the month set
 *
 * @example
 * // Set the 30th day of the month to 1 September 2014:
 * const result = setDate(new Date(2014, 8, 1), 30)
 * //=> Tue Sep 30 2014 00:00:00
 */
export function setDate<T extends DateLike>(date: T, dayOfMonth: number): T;
export function setDate(date: Date | DateLike, dayOfMonth: number): Date | DateLike {
  if (date instanceof Date) {
    return withDate(date, (dateTime) => setDateValue(dateTime, dayOfMonth));
  }
  return setDateValue(date, dayOfMonth);
}
