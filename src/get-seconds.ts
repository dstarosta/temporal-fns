import { dateToPlainDateTime } from './helpers/convert.js';
import { type TimeLike } from './types.js';

/**
 * @summary Get the seconds of the given date.
 *
 * @description
 * Get the seconds of the given date.
 *
 * @param date - The given date
 *
 * @returns The seconds
 *
 * @example
 * // Get the seconds of 29 February 2012 11:45:05.123:
 * const result = getSeconds(new Date(2012, 1, 29, 11, 45, 5, 123))
 * //=> 5
 */
export function getSeconds(date: Date): number;
export function getSeconds(date: TimeLike): number;
export function getSeconds(date: Date | TimeLike): number {
  return date instanceof Date ? dateToPlainDateTime(date).second : date.second;
}
