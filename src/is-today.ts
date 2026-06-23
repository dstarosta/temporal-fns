import { constructNowValue } from './construct-now.js';
import { isSameDayValue } from './is-same-day.js';
import { type DateLike } from './types.js';

/**
 * @summary Is the given date today?
 *
 * @description
 * Is the given date today?
 *
 * @param date - The date to check
 *
 * @returns The date is today
 *
 * @example
 * // If today is 6 October 2014, is 6 October 14:00:00 today?
 * const result = isToday(new Date(2014, 9, 6, 14, 0))
 * //=> true
 */
export function isToday(date: Date | DateLike): boolean {
  return isSameDayValue(date, constructNowValue(date));
}
