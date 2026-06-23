import { isoDayOfWeekToSundayBased } from './helpers/week.js';
import { type DateLike } from './types.js';

/**
 * @summary Does the given date fall on a weekend?
 *
 * @description
 * Does the given date fall on a weekend? A weekend is either Saturday (`6`) or Sunday (`0`).
 *
 * Untyped variant of {@link isWeekend} that accepts the `Date | DateLike` union directly,
 * without the overloaded type narrowing.
 *
 * @param date - The date to check
 *
 * @returns The date falls on a weekend
 */
export function isWeekendValue(date: Date | DateLike): boolean {
  const dayOfWeek =
    date instanceof Date ? date.getDay() : isoDayOfWeekToSundayBased(date.dayOfWeek);
  return dayOfWeek === 0 || dayOfWeek === 6;
}

/**
 * @summary Does the given date fall on a weekend?
 *
 * @description
 * Does the given date fall on a weekend? A weekend is either Saturday (`6`) or Sunday (`0`).
 *
 * @param date - The date to check
 *
 * @returns The date falls on a weekend
 *
 * @example
 * // Does 5 October 2014 fall on a weekend?
 * const result = isWeekend(new Date(2014, 9, 5))
 * //=> true
 */
export function isWeekend(date: Date): boolean;
export function isWeekend(date: DateLike): boolean;
export function isWeekend(date: Date | DateLike): boolean {
  return isWeekendValue(date);
}
