import { resolveWeekStartsOn } from './helpers/default-options.js';
import { getDayValue } from './helpers/week.js';
import { dateToPlainDateTime } from './helpers/convert.js';
import { startOfMonthValue } from './start-of-month.js';
import { type LocalWeekOptions } from './helpers/local-week.js';
import { type DateLike } from './types.js';

/**
 * @summary Get the week of the month of the given date.
 *
 * @description
 * Get the week of the month of the given date.
 *
 * @param date - The given date
 * @param options - An object with options
 *
 * @returns The week of month
 *
 * @example
 * // Which week of the month is 9 November 2017?
 * const result = getWeekOfMonth(new Date(2017, 10, 9))
 * //=> 2
 */
export function getWeekOfMonth(date: Date, options?: LocalWeekOptions): number;
export function getWeekOfMonth(date: DateLike, options?: LocalWeekOptions): number;
export function getWeekOfMonth(date: Date | DateLike, options?: LocalWeekOptions): number {
  const weekStartsOn = resolveWeekStartsOn(options?.weekStartsOn);
  const currentDayOfMonth = date instanceof Date ? dateToPlainDateTime(date).day : date.day;
  const startWeekDay = getDayValue(startOfMonthValue(date));

  let lastDayOfFirstWeek = weekStartsOn - startWeekDay;
  if (lastDayOfFirstWeek <= 0) {
    lastDayOfFirstWeek += 7;
  }

  const remainingDaysAfterFirstWeek = currentDayOfMonth - lastDayOfFirstWeek;
  return Math.ceil(remainingDaysAfterFirstWeek / 7) + 1;
}
