import { constructNowValue } from './construct-now.js';
import { isSameDayValue } from './is-same-day.js';
import { subDaysValue } from './sub-days.js';
import { type DateLike } from './types.js';

/**
 * @summary Is the given date yesterday?
 *
 * @description
 * Is the given date yesterday?
 *
 * @param date - The date to check
 *
 * @returns The date is yesterday
 *
 * @example
 * // If today is 6 October 2014, is 5 October 14:00:00 yesterday?
 * const result = isYesterday(new Date(2014, 9, 5, 14, 0))
 * //=> true
 */
export function isYesterday(date: Date | DateLike): boolean {
  return isSameDayValue(date, subDaysValue(constructNowValue(date), 1));
}
