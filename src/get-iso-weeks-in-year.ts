import { getISOWeekYearValue, getISOWeekValue } from './helpers/iso-week.js';
import { type DateLike } from './types.js';

// Dec 28 always falls in the last ISO week of the year (by symmetry with Jan
// 4, which always falls in ISO week 1), so its week number is the year's
// total week count.
/**
 * @summary Get the number of weeks in an ISO week-numbering year of the given date.
 *
 * @description
 * Get the number of weeks in an ISO week-numbering year of the given date.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param date - The given date
 *
 * @returns The number of ISO weeks in a year
 *
 * @example
 * // How many weeks are in ISO week-numbering year 2015?
 * const result = getISOWeeksInYear(new Date(2015, 1, 11))
 * //=> 53
 */
export function getISOWeeksInYear(date: Date): number;
export function getISOWeeksInYear(date: DateLike): number;
export function getISOWeeksInYear(date: Date | DateLike): number {
  const year = getISOWeekYearValue(date);
  return getISOWeekValue(Temporal.PlainDate.from({ year, month: 12, day: 28 }));
}
