import { constructNowValue } from './construct-now.js';
import { isSameWeekValue } from './is-same-week.js';
import { type DateLike } from './types.js';

/**
 * @summary Is the given date in the same ISO week as the current date?
 *
 * @description
 * Is the given date in the same ISO week as the current date?
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param date - The date to check
 *
 * @returns The date is in this ISO week
 *
 * @example
 * // If today is 25 September 2014, is 22 September 2014 in this ISO week?
 * const result = isThisISOWeek(new Date(2014, 8, 22))
 * //=> true
 */
export function isThisISOWeek(date: Date | DateLike): boolean {
  return isSameWeekValue(date, constructNowValue(date), { weekStartsOn: 1 });
}
