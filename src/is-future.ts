import { compare } from './helpers/compare.js';
import { constructNowValue } from './construct-now.js';
import { type DateLike } from './types.js';

/**
 * @summary Is the given date in the future?
 *
 * @description
 * Is the given date in the future?
 *
 * @param date - The date to check
 *
 * @returns The date is in the future
 *
 * @example
 * // If today is 6 October 2014, is 31 December 2014 in the future?
 * const result = isFuture(new Date(2014, 11, 31))
 * //=> true
 */
export function isFuture(date: Date | DateLike): boolean {
  return compare(date, constructNowValue(date)) > 0;
}
