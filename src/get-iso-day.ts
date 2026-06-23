import { dateToPlainDateTime } from './helpers/convert.js';
import { type DateLike } from './types.js';

// date-fns getISODay is ISO-based (Mon = 1 ... Sun = 7), matching Temporal's
// own dayOfWeek convention directly — no conversion needed.
/**
 * @summary Get the day of the ISO week of the given date.
 *
 * @description
 * Get the day of the ISO week of the given date, which is 7 for Sunday, 1 for Monday etc.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param date - The given date
 *
 * @returns The day of ISO week
 *
 * @example
 * // Which day of the ISO week is 26 February 2012?
 * const result = getISODay(new Date(2012, 1, 26))
 * //=> 7
 */
export function getISODay(date: Date): number;
export function getISODay(date: DateLike): number;
export function getISODay(date: Date | DateLike): number {
  return date instanceof Date ? dateToPlainDateTime(date).dayOfWeek : date.dayOfWeek;
}
