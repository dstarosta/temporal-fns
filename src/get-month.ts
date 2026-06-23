import { dateToPlainDateTime } from './helpers/convert.js';
import { type DateLike } from './types.js';

// date-fns getMonth is 0-indexed (Jan = 0), matching JS Date#getMonth.
// Temporal.PlainDate.month is 1-indexed (Jan = 1).
/**
 * @summary Get the month of the given date.
 *
 * @description
 * Get the month of the given date.
 *
 * @param date - The given date
 *
 * @returns The month index (0-11)
 *
 * @example
 * // Which month is 29 February 2012?
 * const result = getMonth(new Date(2012, 1, 29))
 * //=> 1
 */
export function getMonth(date: Date): number;
export function getMonth(date: DateLike): number;
export function getMonth(date: Date | DateLike): number {
  const month = date instanceof Date ? dateToPlainDateTime(date).month : date.month;
  return month - 1;
}
