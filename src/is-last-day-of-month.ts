import { dateToPlainDateTime } from './helpers/convert.js';
import { type DateLike } from './types.js';

/**
 * @summary Is the given date the last day of a month?
 *
 * @description
 * Is the given date the last day of a month?
 *
 * @param date - The date to check
 *
 * @returns The date is the last day of a month
 *
 * @example
 * // Is 28 February 2014 the last day of a month?
 * const result = isLastDayOfMonth(new Date(2014, 1, 28))
 * //=> true
 */
export function isLastDayOfMonth(date: Date): boolean;
export function isLastDayOfMonth(date: DateLike): boolean;
export function isLastDayOfMonth(date: Date | DateLike): boolean {
  const dateLike = date instanceof Date ? dateToPlainDateTime(date) : date;
  return dateLike.day === dateLike.daysInMonth;
}
