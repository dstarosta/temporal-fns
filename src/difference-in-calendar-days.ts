import { dateToPlainDateTime } from './helpers/convert.js';
import { differenceInCalendarDaysFields } from './helpers/difference-fields.js';
import { type DateLike } from './types.js';

function toYearMonthDay(value: Date | DateLike): { year: number; month: number; day: number } {
  if (value instanceof Date) {
    const dateTime = dateToPlainDateTime(value);
    return { year: dateTime.year, month: dateTime.month, day: dateTime.day };
  }
  return { year: value.year, month: value.month, day: value.day };
}

/**
 * @summary Get the number of calendar days between the given dates.
 *
 * @description
 * Get the number of calendar days between the given dates. This means that the times are removed
 * from the dates and then the difference in days is calculated.
 *
 * Untyped variant of {@link differenceInCalendarDays} that accepts the `Date | DateLike` union directly,
 * without the overloaded type narrowing.
 *
 * @param a - The later date
 * @param b - The earlier date
 *
 * @returns The number of calendar days
 */
export function differenceInCalendarDaysValue(a: Date | DateLike, b: Date | DateLike): number {
  return differenceInCalendarDaysFields(toYearMonthDay(a), toYearMonthDay(b));
}

/**
 * @summary Get the number of calendar days between the given dates.
 *
 * @description
 * Get the number of calendar days between the given dates. This means that the times are removed
 * from the dates and then the difference in days is calculated.
 *
 * @param a - The later date
 * @param b - The earlier date
 *
 * @returns The number of calendar days
 *
 * @example
 * // How many calendar days are between
 * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
 * const result = differenceInCalendarDays(
 *   new Date(2012, 6, 2, 0, 0),
 *   new Date(2011, 6, 2, 23, 0)
 * )
 * //=> 366
 * // How many calendar days are between
 * // 2 July 2011 23:59:00 and 3 July 2011 00:01:00?
 * const result = differenceInCalendarDays(
 *   new Date(2011, 6, 3, 0, 1),
 *   new Date(2011, 6, 2, 23, 59)
 * )
 * //=> 1
 */
export function differenceInCalendarDays(a: Date, b: Date): number;
/**
 * @summary Get the number of calendar days between the given dates.
 *
 * @description
 * Get the number of calendar days between the given dates. This means that the times are removed
 * from the dates and then the difference in days is calculated.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `a`/`b`; both arguments must share the same concrete type.
 *
 * @param a - The later date
 * @param b - The earlier date
 *
 * @returns The number of calendar days
 *
 * @example
 * // How many calendar days are between
 * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
 * const result = differenceInCalendarDays(
 *   new Date(2012, 6, 2, 0, 0),
 *   new Date(2011, 6, 2, 23, 0)
 * )
 * //=> 366
 * // How many calendar days are between
 * // 2 July 2011 23:59:00 and 3 July 2011 00:01:00?
 * const result = differenceInCalendarDays(
 *   new Date(2011, 6, 3, 0, 1),
 *   new Date(2011, 6, 2, 23, 59)
 * )
 * //=> 1
 */
export function differenceInCalendarDays<T extends DateLike>(a: T, b: T): number;
export function differenceInCalendarDays(a: Date | DateLike, b: Date | DateLike): number {
  return differenceInCalendarDaysValue(a, b);
}
