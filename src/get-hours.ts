import { dateToPlainDateTime } from './helpers/convert.js';
import { type TimeLike } from './types.js';

/**
 * @summary Get the hours of the given date.
 *
 * @description
 * Get the hours of the given date.
 *
 * @param date - The given date
 *
 * @returns The hours
 *
 * @example
 * // Get the hours of 29 February 2012 11:45:00:
 * const result = getHours(new Date(2012, 1, 29, 11, 45))
 * //=> 11
 */
export function getHours(date: Date): number;
export function getHours(date: TimeLike): number;
export function getHours(date: Date | TimeLike): number {
  return date instanceof Date ? dateToPlainDateTime(date).hour : date.hour;
}
