import { resolveWeekStartsOn } from './helpers/default-options.js';
import { differenceInCalendarDaysFields } from './helpers/difference-fields.js';
import { toPlainDate } from './helpers/plain-date-result.js';
import { isoDayOfWeekToSundayBased } from './helpers/week.js';
import { type StartOfWeekOptions } from './start-of-week.js';
import { type DateLike } from './types.js';

function startOfWeekYearMonthDay(
  value: Date | DateLike,
  weekStartsOn: number
): { year: number; month: number; day: number } {
  const plainDate = toPlainDate(value);
  const sundayBasedDay = isoDayOfWeekToSundayBased(plainDate.dayOfWeek);
  const daysSinceWeekStart =
    sundayBasedDay < weekStartsOn
      ? sundayBasedDay - weekStartsOn + 7
      : sundayBasedDay - weekStartsOn;

  const startOfWeekDate = plainDate.subtract({ days: daysSinceWeekStart });
  return { year: startOfWeekDate.year, month: startOfWeekDate.month, day: startOfWeekDate.day };
}

/**
 * @summary Get the number of calendar weeks between the given dates.
 *
 * @description
 * Get the number of calendar weeks between the given dates.
 *
 * Untyped variant of {@link differenceInCalendarWeeks} that accepts the `Date | DateLike` union
 * directly, without the overloaded type narrowing.
 *
 * @param a - The later date
 * @param b - The earlier date
 * @param options - An object with options
 *
 * @returns The number of calendar weeks
 */
export function differenceInCalendarWeeksValue(
  a: Date | DateLike,
  b: Date | DateLike,
  options?: StartOfWeekOptions
): number {
  const weekStartsOn = resolveWeekStartsOn(options?.weekStartsOn);
  const days = differenceInCalendarDaysFields(
    startOfWeekYearMonthDay(a, weekStartsOn),
    startOfWeekYearMonthDay(b, weekStartsOn)
  );
  const weeks = Math.round(days / 7);
  return weeks === 0 ? 0 : weeks;
}

/**
 * @summary Get the number of calendar weeks between the given dates.
 *
 * @description
 * Get the number of calendar weeks between the given dates.
 *
 * @param a - The later date
 * @param b - The earlier date
 * @param options - An object with options
 *
 * @returns The number of calendar weeks
 *
 * @example
 * // How many calendar weeks are between 5 July 2014 and 20 July 2014?
 * const result = differenceInCalendarWeeks(
 *   new Date(2014, 6, 20),
 *   new Date(2014, 6, 5)
 * )
 * //=> 3
 *
 * @example
 * // If the week starts on Monday,
 * // how many calendar weeks are between 5 July 2014 and 20 July 2014?
 * const result = differenceInCalendarWeeks(
 *   new Date(2014, 6, 20),
 *   new Date(2014, 6, 5),
 *   { weekStartsOn: 1 }
 * )
 * //=> 2
 */
export function differenceInCalendarWeeks(a: Date, b: Date, options?: StartOfWeekOptions): number;
/**
 * @summary Get the number of calendar weeks between the given dates.
 *
 * @description
 * Get the number of calendar weeks between the given dates.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `a`/`b`; both arguments must share the same concrete type.
 *
 * @param a - The later date
 * @param b - The earlier date
 * @param options - An object with options
 *
 * @returns The number of calendar weeks
 *
 * @example
 * // How many calendar weeks are between 5 July 2014 and 20 July 2014?
 * const result = differenceInCalendarWeeks(
 *   new Date(2014, 6, 20),
 *   new Date(2014, 6, 5)
 * )
 * //=> 3
 *
 * @example
 * // If the week starts on Monday,
 * // how many calendar weeks are between 5 July 2014 and 20 July 2014?
 * const result = differenceInCalendarWeeks(
 *   new Date(2014, 6, 20),
 *   new Date(2014, 6, 5),
 *   { weekStartsOn: 1 }
 * )
 * //=> 2
 */
export function differenceInCalendarWeeks<T extends DateLike>(
  a: T,
  b: T,
  options?: StartOfWeekOptions
): number;
export function differenceInCalendarWeeks(
  a: Date | DateLike,
  b: Date | DateLike,
  options?: StartOfWeekOptions
): number {
  return differenceInCalendarWeeksValue(a, b, options);
}
