import { dateToPlainDateTime } from './helpers/convert.js';
import { getQuarterValue } from './get-quarter.js';
import { type DateLike } from './types.js';

function yearOf(value: Date | DateLike): number {
  return value instanceof Date ? dateToPlainDateTime(value).year : value.year;
}

/**
 * @summary Get the number of calendar quarters between the given dates.
 *
 * @description
 * Get the number of calendar quarters between the given dates.
 *
 * Untyped variant of {@link differenceInCalendarQuarters} that accepts the `Date | DateLike` union
 * directly, without the overloaded type narrowing.
 *
 * @param a - The later date
 * @param b - The earlier date
 *
 * @returns The number of calendar quarters
 */
export function differenceInCalendarQuartersValue(a: Date | DateLike, b: Date | DateLike): number {
  const yearsDiff = yearOf(a) - yearOf(b);
  const quartersDiff = getQuarterValue(a) - getQuarterValue(b);
  return yearsDiff * 4 + quartersDiff;
}

/**
 * @summary Get the number of calendar quarters between the given dates.
 *
 * @description
 * Get the number of calendar quarters between the given dates.
 *
 * @param a - The later date
 * @param b - The earlier date
 *
 * @returns The number of calendar quarters
 *
 * @example
 * // How many calendar quarters are between 31 December 2013 and 2 July 2014?
 * const result = differenceInCalendarQuarters(
 *   new Date(2014, 6, 2),
 *   new Date(2013, 11, 31)
 * )
 * //=> 3
 */
export function differenceInCalendarQuarters(a: Date, b: Date): number;
/**
 * @summary Get the number of calendar quarters between the given dates.
 *
 * @description
 * Get the number of calendar quarters between the given dates.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `a`/`b`; both arguments must share the same concrete type.
 *
 * @param a - The later date
 * @param b - The earlier date
 *
 * @returns The number of calendar quarters
 *
 * @example
 * // How many calendar quarters are between 31 December 2013 and 2 July 2014?
 * const result = differenceInCalendarQuarters(
 *   new Date(2014, 6, 2),
 *   new Date(2013, 11, 31)
 * )
 * //=> 3
 */
export function differenceInCalendarQuarters<T extends DateLike>(a: T, b: T): number;
export function differenceInCalendarQuarters(a: Date | DateLike, b: Date | DateLike): number {
  return differenceInCalendarQuartersValue(a, b);
}
