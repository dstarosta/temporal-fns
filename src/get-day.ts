import { getDayValue } from './helpers/week.js';
import { type DateLike } from './types.js';

// date-fns getDay is Sunday-based (Sun = 0 ... Sat = 6), matching JS
// Date#getDay. Temporal's dayOfWeek is ISO-based (Mon = 1 ... Sun = 7).
/**
 * @summary Get the day of the week of the given date.
 *
 * @description
 * Get the day of the week of the given date.
 *
 * @param date - The given date
 *
 * @returns The day of week, 0 represents Sunday
 *
 * @example
 * // Which day of the week is 29 February 2012?
 * const result = getDay(new Date(2012, 1, 29))
 * //=> 3
 */
export function getDay(date: Date): number;
export function getDay(date: DateLike): number;
export function getDay(date: Date | DateLike): number {
  return getDayValue(date);
}
