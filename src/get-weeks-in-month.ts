import { differenceInCalendarWeeksValue } from './difference-in-calendar-weeks.js';
import { lastDayOfMonth } from './last-day-of-month.js';
import { startOfMonth } from './start-of-month.js';
import { type LocalWeekOptions } from './helpers/local-week.js';
import { type DateLike } from './types.js';

/**
 * @summary Get the number of calendar weeks a month spans.
 *
 * @description
 * Get the number of calendar weeks the month in the given date spans.
 *
 * @param date - The given date
 * @param options - An object with options
 *
 * @returns The number of calendar weeks
 *
 * @example
 * // How many calendar weeks does February 2015 span?
 * const result = getWeeksInMonth(new Date(2015, 1, 8))
 * //=> 4
 *
 * @example
 * // If the week starts on Monday,
 * // how many calendar weeks does July 2017 span?
 * const result = getWeeksInMonth(new Date(2017, 6, 5), { weekStartsOn: 1 })
 * //=> 6
 */
export function getWeeksInMonth(date: Date, options?: LocalWeekOptions): number;
export function getWeeksInMonth(date: DateLike, options?: LocalWeekOptions): number;
export function getWeeksInMonth(date: Date | DateLike, options?: LocalWeekOptions): number {
  if (date instanceof Date) {
    return differenceInCalendarWeeksValue(lastDayOfMonth(date), startOfMonth(date), options) + 1;
  }
  return differenceInCalendarWeeksValue(lastDayOfMonth(date), startOfMonth(date), options) + 1;
}
