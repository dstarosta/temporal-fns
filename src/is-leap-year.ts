import { dateToPlainDateTime } from './helpers/convert.js';
import { type DateLike } from './types.js';

/**
 * @summary Is the given date in the leap year?
 *
 * @description
 * Is the given date in the leap year?
 *
 * @param date - The date to check
 *
 * @returns The date is in the leap year
 *
 * @example
 * // Is 1 September 2012 in the leap year?
 * const result = isLeapYear(new Date(2012, 8, 1))
 * //=> true
 */
export function isLeapYear(date: Date): boolean;
export function isLeapYear(date: DateLike): boolean;
export function isLeapYear(date: Date | DateLike): boolean {
  return date instanceof Date ? dateToPlainDateTime(date).inLeapYear : date.inLeapYear;
}
