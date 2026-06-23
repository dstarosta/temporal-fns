import { dateToPlainDateTime } from './helpers/convert.js';
import { type DateLike } from './types.js';

/**
 * @summary Get the year quarter of the given date.
 *
 * @description
 * Get the year quarter of the given date.
 *
 * Untyped variant of {@link getQuarter} that accepts the `Date | DateLike` union directly,
 * without the overloaded type narrowing.
 *
 * @param date - The given date
 *
 * @returns The quarter
 */
export function getQuarterValue(date: Date | DateLike): number {
  const month = date instanceof Date ? dateToPlainDateTime(date).month : date.month;
  return Math.trunc((month - 1) / 3) + 1;
}

/**
 * @summary Get the year quarter of the given date.
 *
 * @description
 * Get the year quarter of the given date.
 *
 * @param date - The given date
 *
 * @returns The quarter
 *
 * @example
 * // Which quarter is 2 July 2014?
 * const result = getQuarter(new Date(2014, 6, 2));
 * //=> 3
 */
export function getQuarter(date: Date): number;
export function getQuarter(date: DateLike): number;
export function getQuarter(date: Date | DateLike): number {
  return getQuarterValue(date);
}
