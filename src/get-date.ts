import { dateToPlainDateTime } from './helpers/convert.js';
import { type DateLike } from './types.js';

/**
 * @summary Get the day of the month of the given date.
 *
 * @description
 * Get the day of the month of the given date.
 *
 * @param date - The given date
 *
 * @returns The day of month
 *
 * @example
 * // Which day of the month is 29 February 2012?
 * const result = getDate(new Date(2012, 1, 29))
 * //=> 29
 */
export function getDate(date: Date): number;
export function getDate(date: DateLike): number;
export function getDate(date: Date | DateLike): number {
  return date instanceof Date ? dateToPlainDateTime(date).day : date.day;
}
