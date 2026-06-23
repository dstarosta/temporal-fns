import { dateToPlainDateTime } from './helpers/convert.js';
import { type DateLike } from './types.js';

/**
 * @summary Get the decade of the given date.
 *
 * @description
 * Get the decade of the given date.
 *
 * @param date - The given date
 *
 * @returns The year of decade
 *
 * @example
 * // Which decade belongs 27 November 1942?
 * const result = getDecade(new Date(1942, 10, 27))
 * //=> 1940
 */
export function getDecade(date: Date): number;
export function getDecade(date: DateLike): number;
export function getDecade(date: Date | DateLike): number {
  const year = date instanceof Date ? dateToPlainDateTime(date).year : date.year;
  return Math.floor(year / 10) * 10;
}
