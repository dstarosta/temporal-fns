import { dateToPlainDateTime } from './helpers/convert.js';
import { type TimeLike } from './types.js';

/**
 * @summary Get the minutes of the given date.
 *
 * @description
 * Get the minutes of the given date.
 *
 * @param date - The given date
 *
 * @returns The minutes
 *
 * @example
 * // Get the minutes of 29 February 2012 11:45:05:
 * const result = getMinutes(new Date(2012, 1, 29, 11, 45, 5))
 * //=> 45
 */
export function getMinutes(date: Date): number;
export function getMinutes(date: TimeLike): number;
export function getMinutes(date: Date | TimeLike): number {
  return date instanceof Date ? dateToPlainDateTime(date).minute : date.minute;
}
