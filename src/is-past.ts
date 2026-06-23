import { compare } from './helpers/compare.js';
import { constructNowValue } from './construct-now.js';
import { type DateLike } from './types.js';

/**
 * @summary Is the given date in the past?
 *
 * @description
 * Is the given date in the past?
 *
 * @param date - The date to check
 *
 * @returns The date is in the past
 *
 * @example
 * // If today is 6 October 2014, is 2 July 2014 in the past?
 * const result = isPast(new Date(2014, 6, 2))
 * //=> true
 */
export function isPast(date: Date | DateLike): boolean {
  return compare(date, constructNowValue(date)) < 0;
}
