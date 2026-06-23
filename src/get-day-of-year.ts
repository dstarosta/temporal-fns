import { differenceInCalendarDaysValue } from './difference-in-calendar-days.js';
import { startOfYear } from './start-of-year.js';
import { type DateLike } from './types.js';

/**
 * @summary Get the day of the year of the given date.
 *
 * @description
 * Get the day of the year of the given date.
 *
 * @param date - The given date
 *
 * @returns The day of year
 *
 * @example
 * // Which day of the year is 2 July 2014?
 * const result = getDayOfYear(new Date(2014, 6, 2))
 * //=> 183
 */
export function getDayOfYear(date: Date): number;
export function getDayOfYear(date: DateLike): number;
export function getDayOfYear(date: Date | DateLike): number {
  if (date instanceof Date) {
    return differenceInCalendarDaysValue(date, startOfYear(date)) + 1;
  }
  return differenceInCalendarDaysValue(date, startOfYear(date)) + 1;
}
