import { dateToPlainDateTime } from './helpers/convert.js';
import { type DateLike } from './types.js';

function yearMonthOf(value: Date | DateLike): { year: number; month: number } {
  if (value instanceof Date) {
    const dateTime = dateToPlainDateTime(value);
    return { year: dateTime.year, month: dateTime.month };
  }
  return { year: value.year, month: value.month };
}

/**
 * @summary Get the number of calendar months between the given dates.
 *
 * @description
 * Get the number of calendar months between the given dates.
 *
 * Untyped variant of {@link differenceInCalendarMonths} that accepts the `Date | DateLike` union
 * directly, without the overloaded type narrowing.
 *
 * @param a - The later date
 * @param b - The earlier date
 *
 * @returns The number of calendar months
 */
export function differenceInCalendarMonthsValue(a: Date | DateLike, b: Date | DateLike): number {
  const aFields = yearMonthOf(a);
  const bFields = yearMonthOf(b);
  return (aFields.year - bFields.year) * 12 + (aFields.month - bFields.month);
}

/**
 * @summary Get the number of calendar months between the given dates.
 *
 * @description
 * Get the number of calendar months between the given dates.
 *
 * @param a - The later date
 * @param b - The earlier date
 *
 * @returns The number of calendar months
 *
 * @example
 * // How many calendar months are between 31 January 2014 and 1 September 2014?
 * const result = differenceInCalendarMonths(
 *   new Date(2014, 8, 1),
 *   new Date(2014, 0, 31)
 * )
 * //=> 8
 */
export function differenceInCalendarMonths(a: Date, b: Date): number;
/**
 * @summary Get the number of calendar months between the given dates.
 *
 * @description
 * Get the number of calendar months between the given dates.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `a`/`b`; both arguments must share the same concrete type.
 *
 * @param a - The later date
 * @param b - The earlier date
 *
 * @returns The number of calendar months
 *
 * @example
 * // How many calendar months are between 31 January 2014 and 1 September 2014?
 * const result = differenceInCalendarMonths(
 *   new Date(2014, 8, 1),
 *   new Date(2014, 0, 31)
 * )
 * //=> 8
 */
export function differenceInCalendarMonths<T extends DateLike>(a: T, b: T): number;
export function differenceInCalendarMonths(a: Date | DateLike, b: Date | DateLike): number {
  return differenceInCalendarMonthsValue(a, b);
}
