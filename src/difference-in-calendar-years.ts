import { dateToPlainDateTime } from './helpers/convert.js';
import { type DateLike } from './types.js';

function yearOf(value: Date | DateLike): number {
  return value instanceof Date ? dateToPlainDateTime(value).year : value.year;
}

/**
 * @summary Get the number of calendar years between the given dates.
 *
 * @description
 * Get the number of calendar years between the given dates.
 *
 * Untyped variant of {@link differenceInCalendarYears} that accepts the `Date | DateLike` union
 * directly, without the overloaded type narrowing.
 *
 * @param a - The later date
 * @param b - The earlier date
 *
 * @returns The number of calendar years
 */
export function differenceInCalendarYearsValue(a: Date | DateLike, b: Date | DateLike): number {
  return yearOf(a) - yearOf(b);
}

/**
 * @summary Get the number of calendar years between the given dates.
 *
 * @description
 * Get the number of calendar years between the given dates.
 *
 * @param a - The later date
 * @param b - The earlier date
 *
 * @returns The number of calendar years
 *
 * @example
 * // How many calendar years are between 31 December 2013 and 11 February 2015?
 * const result = differenceInCalendarYears(
 *   new Date(2015, 1, 11),
 *   new Date(2013, 11, 31)
 * );
 * //=> 2
 */
export function differenceInCalendarYears(a: Date, b: Date): number;
/**
 * @summary Get the number of calendar years between the given dates.
 *
 * @description
 * Get the number of calendar years between the given dates.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `a`/`b`; both arguments must share the same concrete type.
 *
 * @param a - The later date
 * @param b - The earlier date
 *
 * @returns The number of calendar years
 *
 * @example
 * // How many calendar years are between 31 December 2013 and 11 February 2015?
 * const result = differenceInCalendarYears(
 *   new Date(2015, 1, 11),
 *   new Date(2013, 11, 31)
 * );
 * //=> 2
 */
export function differenceInCalendarYears<T extends DateLike>(a: T, b: T): number;
export function differenceInCalendarYears(a: Date | DateLike, b: Date | DateLike): number {
  return differenceInCalendarYearsValue(a, b);
}
