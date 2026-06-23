import { constructNowValue } from './construct-now.js';
import { isSameMonthValue } from './is-same-month.js';
import { type DateLike } from './types.js';

/**
 * @summary Is the given date in the same month as the current date?
 *
 * @description
 * Is the given date in the same month as the current date?
 *
 * @param date - The date to check
 *
 * @returns The date is in this month
 *
 * @example
 * // If today is 25 September 2014, is 15 September 2014 in this month?
 * const result = isThisMonth(new Date(2014, 8, 15))
 * //=> true
 */
export function isThisMonth(date: Date | DateLike): boolean {
  return isSameMonthValue(date, constructNowValue(date));
}
