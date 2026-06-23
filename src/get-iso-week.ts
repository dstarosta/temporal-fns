import { getISOWeekValue } from './helpers/iso-week.js';
import { type DateLike } from './types.js';

/**
 * @summary Get the ISO week of the given date.
 *
 * @description
 * Get the ISO week of the given date.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param date - The given date
 *
 * @returns The ISO week
 *
 * @example
 * // Which week of the ISO-week numbering year is 2 January 2005?
 * const result = getISOWeek(new Date(2005, 0, 2))
 * //=> 53
 */
export function getISOWeek(date: Date): number;
export function getISOWeek(date: DateLike): number;
export function getISOWeek(date: Date | DateLike): number {
  return getISOWeekValue(date);
}
