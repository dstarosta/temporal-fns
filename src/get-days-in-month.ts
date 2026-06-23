import { dateToPlainDateTime } from './helpers/convert.js';
import { type DateLike } from './types.js';

/**
 * @summary Get the number of days in a month of the given date.
 *
 * @description
 * Get the number of days in a month of the given date.
 *
 * @param date - The given date
 *
 * @returns The number of days in a month
 *
 * @example
 * // How many days are in February 2000?
 * const result = getDaysInMonth(new Date(2000, 1))
 * //=> 29
 */
export function getDaysInMonth(date: Date): number;
export function getDaysInMonth(date: DateLike): number;
export function getDaysInMonth(date: Date | DateLike): number {
  return date instanceof Date ? dateToPlainDateTime(date).daysInMonth : date.daysInMonth;
}
