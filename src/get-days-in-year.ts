import { dateToPlainDateTime } from './helpers/convert.js';
import { type DateLike } from './types.js';

/**
 * @summary Get the number of days in a year of the given date.
 *
 * @description
 * Get the number of days in a year of the given date.
 *
 * @param date - The given date
 *
 * @returns The number of days in a year
 *
 * @example
 * // How many days are in 2012?
 * const result = getDaysInYear(new Date(2012, 0, 1))
 * //=> 366
 */
export function getDaysInYear(date: Date): number;
export function getDaysInYear(date: DateLike): number;
export function getDaysInYear(date: Date | DateLike): number {
  const inLeapYear = date instanceof Date ? dateToPlainDateTime(date).inLeapYear : date.inLeapYear;
  return inLeapYear ? 366 : 365;
}
