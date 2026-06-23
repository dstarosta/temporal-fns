import {
  differenceInDaysFields,
  differenceInMonthsFields,
  differenceInYearsFields,
} from './difference-fields.js';
import { getDateTimeFields as toFields } from './format-fields.js';
import { type DateLike } from '../types.js';

/**
 * @summary Get the number of full days between the given dates.
 *
 * @description
 * Get the number of full day periods between two dates. Fractional days are
 * truncated towards zero.
 *
 * One "full day" is the distance between a local time in one day to the same
 * local time on the next or previous day. A full day can sometimes be less than
 * or more than 24 hours if a daylight savings change happens between two dates.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `a`/`b`; both arguments must share the same concrete type.
 *
 * @param a - The later date
 * @param b - The earlier date
 *
 * @returns The number of full days
 *
 * @example
 * // How many full days are between
 * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
 * const result = differenceInDays(
 *   new Date(2012, 6, 2, 0, 0),
 *   new Date(2011, 6, 2, 23, 0)
 * )
 * //=> 365
 *
 * @example
 * // How many full days are between
 * // 2 July 2011 23:59:00 and 3 July 2011 00:01:00?
 * const result = differenceInDays(
 *   new Date(2011, 6, 3, 0, 1),
 *   new Date(2011, 6, 2, 23, 59)
 * )
 * //=> 0
 */
export function differenceInDays(a: Date, b: Date): number;
export function differenceInDays<T extends DateLike>(a: T, b: T): number;
export function differenceInDays(a: Date | DateLike, b: Date | DateLike): number {
  return differenceInDaysFields(toFields(a), toFields(b));
}

/**
 * @summary Get the number of full weeks between the given dates.
 *
 * @description
 * Get the number of full weeks between two dates. Fractional weeks are
 * truncated towards zero.
 *
 * One "full week" is the distance between a local time in one day to the same
 * local time 7 days earlier or later. A full week can sometimes be less than
 * or more than 7*24 hours if a daylight savings change happens between two dates.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `a`/`b`; both arguments must share the same concrete type.
 *
 * @param a - The later date
 * @param b - The earlier date
 *
 * @returns The number of full weeks
 *
 * @example
 * // How many full weeks are between 5 July 2014 and 20 July 2014?
 * const result = differenceInWeeks(new Date(2014, 6, 20), new Date(2014, 6, 5))
 * //=> 2
 */
export function differenceInWeeks(a: Date, b: Date): number;
export function differenceInWeeks<T extends DateLike>(a: T, b: T): number;
export function differenceInWeeks(a: Date | DateLike, b: Date | DateLike): number {
  const days = differenceInDaysFields(toFields(a), toFields(b));
  const weeks = days / 7;
  const result = Math.trunc(weeks);
  return result === 0 ? 0 : result;
}

/**
 * @summary Get the number of full months between the given dates.
 *
 * @description
 * Get the number of full months between the given dates.
 *
 * Untyped variant of {@link differenceInMonths} that accepts the `Date | DateLike` union directly,
 * without the overloaded type narrowing.
 *
 * @param a - The later date
 * @param b - The earlier date
 *
 * @returns The number of full months
 */
export function differenceInMonthsValue(a: Date | DateLike, b: Date | DateLike): number {
  return differenceInMonthsFields(toFields(a), toFields(b));
}

/**
 * @summary Get the number of full months between the given dates.
 *
 * @description
 * Get the number of full months between the given dates.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `a`/`b`; both arguments must share the same concrete type.
 *
 * @param a - The later date
 * @param b - The earlier date
 *
 * @returns The number of full months
 *
 * @example
 * // How many full months are between 31 January 2014 and 1 September 2014?
 * const result = differenceInMonths(new Date(2014, 8, 1), new Date(2014, 0, 31))
 * //=> 7
 */
export function differenceInMonths(a: Date, b: Date): number;
export function differenceInMonths<T extends DateLike>(a: T, b: T): number;
export function differenceInMonths(a: Date | DateLike, b: Date | DateLike): number {
  return differenceInMonthsValue(a, b);
}

/**
 * @summary Get the number of quarters between the given dates.
 *
 * @description
 * Get the number of full quarters between the given dates.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `a`/`b`; both arguments must share the same concrete type.
 *
 * @param a - The later date
 * @param b - The earlier date
 *
 * @returns The number of full quarters
 *
 * @example
 * // How many full quarters are between 31 December 2013 and 2 July 2014?
 * const result = differenceInQuarters(new Date(2014, 6, 2), new Date(2013, 11, 31))
 * //=> 2
 */
export function differenceInQuarters(a: Date, b: Date): number;
export function differenceInQuarters<T extends DateLike>(a: T, b: T): number;
export function differenceInQuarters(a: Date | DateLike, b: Date | DateLike): number {
  const months = differenceInMonthsFields(toFields(a), toFields(b));
  const result = Math.trunc(months / 3);
  return result === 0 ? 0 : result;
}

/**
 * @summary Get the number of full years between the given dates.
 *
 * @description
 * Get the number of full years between the given dates.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `a`/`b`; both arguments must share the same concrete type.
 *
 * @param a - The later date
 * @param b - The earlier date
 *
 * @returns The number of full years
 *
 * @example
 * // How many full years are between 31 December 2013 and 11 February 2015?
 * const result = differenceInYears(new Date(2015, 1, 11), new Date(2013, 11, 31))
 * //=> 1
 */
export function differenceInYears(a: Date, b: Date): number;
export function differenceInYears<T extends DateLike>(a: T, b: T): number;
export function differenceInYears(a: Date | DateLike, b: Date | DateLike): number {
  return differenceInYearsFields(toFields(a), toFields(b));
}
