import { dateToPlainDateTime } from './helpers/convert.js';
import { type TimeLike } from './types.js';

/**
 * @summary Get the milliseconds of the given date.
 *
 * @description
 * Get the milliseconds of the given date.
 *
 * @param date - The given date
 *
 * @returns The milliseconds
 *
 * @example
 * // Get the milliseconds of 29 February 2012 11:45:05.123:
 * const result = getMilliseconds(new Date(2012, 1, 29, 11, 45, 5, 123))
 * //=> 123
 */
export function getMilliseconds(date: Date): number;
export function getMilliseconds(date: TimeLike): number;
export function getMilliseconds(date: Date | TimeLike): number {
  return date instanceof Date ? dateToPlainDateTime(date).millisecond : date.millisecond;
}
