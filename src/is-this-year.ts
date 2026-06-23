import { constructNowValue } from './construct-now.js';
import { isSameYearValue } from './is-same-year.js';
import { type DateLike } from './types.js';

/**
 * @summary Is the given date in the same year as the current date?
 *
 * @description
 * Is the given date in the same year as the current date?
 *
 * @param date - The date to check
 *
 * @returns The date is in this year
 *
 * @example
 * // If today is 25 September 2014, is 2 July 2014 in this year?
 * const result = isThisYear(new Date(2014, 6, 2))
 * //=> true
 */
export function isThisYear(date: Date | DateLike): boolean {
  return isSameYearValue(date, constructNowValue(date));
}
