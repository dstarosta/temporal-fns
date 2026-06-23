import { addDaysValue } from './add-days.js';
import { constructNowValue } from './construct-now.js';
import { isSameDayValue } from './is-same-day.js';
import { type DateLike } from './types.js';

/**
 * @summary Is the given date tomorrow?
 *
 * @description
 * Is the given date tomorrow?
 *
 * @param date - The date to check
 *
 * @returns The date is tomorrow
 *
 * @example
 * // If today is 6 October 2014, is 7 October 14:00:00 tomorrow?
 * const result = isTomorrow(new Date(2014, 9, 7, 14, 0))
 * //=> true
 */
export function isTomorrow(date: Date | DateLike): boolean {
  return isSameDayValue(date, addDaysValue(constructNowValue(date), 1));
}
