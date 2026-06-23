import { withDate } from './helpers/convert.js';
import { type DateLike } from './types.js';

function setISODayValue<T extends DateLike>(date: T, day: number): T {
  const diff = day - date.dayOfWeek;
  return date.add({ days: diff }) as T;
}

/**
 * @summary Set the day of the ISO week to the given date.
 *
 * @description
 * Set the day of the ISO week to the given date.
 * ISO week starts with Monday.
 * 7 is the index of Sunday, 1 is the index of Monday, etc.
 *
 * @param date - The date to be changed
 * @param day - The day of the ISO week of the new date
 *
 * @returns The new date with the day of the ISO week set
 *
 * @example
 * // Set Sunday to 1 September 2014:
 * const result = setISODay(new Date(2014, 8, 1), 7)
 * //=> Sun Sep 07 2014 00:00:00
 */
export function setISODay(date: Date, day: number): Date;
/**
 * @summary Set the day of the ISO week to the given date.
 *
 * @description
 * Set the day of the ISO week to the given date.
 * ISO week starts with Monday.
 * 7 is the index of Sunday, 1 is the index of Monday, etc.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param day - The day of the ISO week of the new date
 *
 * @returns The new date with the day of the ISO week set
 *
 * @example
 * // Set Sunday to 1 September 2014:
 * const result = setISODay(new Date(2014, 8, 1), 7)
 * //=> Sun Sep 07 2014 00:00:00
 */
export function setISODay<T extends DateLike>(date: T, day: number): T;
export function setISODay(date: Date | DateLike, day: number): Date | DateLike {
  if (date instanceof Date) {
    return withDate(date, (dateTime) => setISODayValue(dateTime, day));
  }
  return setISODayValue(date, day);
}
