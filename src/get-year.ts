import { dateToPlainDateTime } from './helpers/convert.js';
import { type DateLike } from './types.js';

/**
 * @summary Get the year of the given date.
 *
 * @description
 * Get the year of the given date.
 *
 * @param date - The given date
 *
 * @returns The year
 *
 * @example
 * // Which year is 2 July 2014?
 * const result = getYear(new Date(2014, 6, 2))
 * //=> 2014
 */
export function getYear(date: Date): number;
export function getYear(date: DateLike): number;
export function getYear(date: Date | DateLike): number {
  return date instanceof Date ? dateToPlainDateTime(date).year : date.year;
}
