import { getISOWeekYearValue } from './helpers/iso-week.js';
import { type DateLike } from './types.js';

/**
 * @summary Get the ISO week-numbering year of the given date.
 *
 * @description
 * Get the ISO week-numbering year of the given date, which always starts 3 days before the year's
 * first Thursday.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param date - The given date
 *
 * @returns The ISO week-numbering year
 *
 * @example
 * // Which ISO-week numbering year is 2 January 2005?
 * const result = getISOWeekYear(new Date(2005, 0, 2))
 * //=> 2004
 */
export function getISOWeekYear(date: Date): number;
export function getISOWeekYear(date: DateLike): number;
export function getISOWeekYear(date: Date | DateLike): number {
  return getISOWeekYearValue(date);
}
