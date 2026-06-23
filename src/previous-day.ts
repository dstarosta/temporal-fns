import { subDaysValue } from './sub-days.js';
import { getDayValue } from './helpers/week.js';
import { type DateLike } from './types.js';

/**
 * @summary When is the previous day of the week?
 *
 * @description
 * When is the previous day of the week? 0-6 the day of the week, 0 represents Sunday.
 *
 * Untyped variant of {@link previousDay} that accepts and returns the `Date | DateLike` union
 * directly, without the overloaded type narrowing.
 *
 * @param date - The date to check
 * @param day - The day of the week
 *
 * @returns The date is the previous day of week
 */
export function previousDayValue(date: Date | DateLike, day: number): Date | DateLike {
  let delta = getDayValue(date) - day;
  if (delta <= 0) {
    delta += 7;
  }
  return subDaysValue(date, delta);
}

/**
 * @summary When is the previous day of the week?
 *
 * @description
 * When is the previous day of the week? 0-6 the day of the week, 0 represents Sunday.
 *
 * @param date - The date to check
 * @param day - The day of the week
 *
 * @returns The date is the previous day of week
 *
 * @example
 * // When is the previous Monday before Mar, 20, 2020?
 * const result = previousDay(new Date(2020, 2, 20), 1)
 * //=> Mon Mar 16 2020 00:00:00
 *
 * @example
 * // When is the previous Tuesday before Mar, 21, 2020?
 * const result = previousDay(new Date(2020, 2, 21), 2)
 * //=> Tue Mar 17 2020 00:00:00
 */
export function previousDay(date: Date, day: number): Date;
/**
 * @summary When is the previous day of the week?
 *
 * @description
 * When is the previous day of the week? 0-6 the day of the week, 0 represents Sunday.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to check
 * @param day - The day of the week
 *
 * @returns The date is the previous day of week
 *
 * @example
 * // When is the previous Monday before Mar, 20, 2020?
 * const result = previousDay(new Date(2020, 2, 20), 1)
 * //=> Mon Mar 16 2020 00:00:00
 *
 * @example
 * // When is the previous Tuesday before Mar, 21, 2020?
 * const result = previousDay(new Date(2020, 2, 21), 2)
 * //=> Tue Mar 17 2020 00:00:00
 */
export function previousDay<T extends DateLike>(date: T, day: number): T;
export function previousDay(date: Date | DateLike, day: number): Date | DateLike {
  return previousDayValue(date, day);
}
