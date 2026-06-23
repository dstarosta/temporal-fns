import { getISOWeekValue } from './helpers/iso-week.js';
import { withDate } from './helpers/convert.js';
import { type DateLike } from './types.js';

/**
 * @summary Set the ISO week to the given date.
 *
 * @description
 * Set the ISO week to the given date, saving the weekday number.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param date - The date to be changed
 * @param week - The ISO week of the new date
 *
 * @returns The new date with the ISO week set
 *
 * @example
 * // Set the 53rd ISO week to 7 August 2004:
 * const result = setISOWeek(new Date(2004, 7, 7), 53)
 * //=> Sat Jan 01 2005 00:00:00
 */
export function setISOWeek(date: Date, week: number): Date;
/**
 * @summary Set the ISO week to the given date.
 *
 * @description
 * Set the ISO week to the given date, saving the weekday number.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param week - The ISO week of the new date
 *
 * @returns The new date with the ISO week set
 *
 * @example
 * // Set the 53rd ISO week to 7 August 2004:
 * const result = setISOWeek(new Date(2004, 7, 7), 53)
 * //=> Sat Jan 01 2005 00:00:00
 */
export function setISOWeek<T extends DateLike>(date: T, week: number): T;
export function setISOWeek(date: Date | DateLike, week: number): Date | DateLike {
  const diff = getISOWeekValue(date) - week;
  if (date instanceof Date) {
    return withDate(date, (dateTime) => dateTime.subtract({ days: diff * 7 }));
  }
  return date.subtract({ days: diff * 7 });
}
