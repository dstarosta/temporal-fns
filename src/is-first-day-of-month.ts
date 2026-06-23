import { dateToPlainDateTime } from './helpers/convert.js';
import { type DateLike } from './types.js';

/**
 * @summary Is the given date the first day of a month?
 *
 * @description
 * Is the given date the first day of a month?
 *
 * @param date - The date to check
 *
 * @returns The date is the first day of a month
 *
 * @example
 * // Is 1 September 2014 the first day of a month?
 * const result = isFirstDayOfMonth(new Date(2014, 8, 1))
 * //=> true
 */
export function isFirstDayOfMonth(date: Date): boolean;
export function isFirstDayOfMonth(date: DateLike): boolean;
export function isFirstDayOfMonth(date: Date | DateLike): boolean {
  const day = date instanceof Date ? dateToPlainDateTime(date).day : date.day;
  return day === 1;
}
