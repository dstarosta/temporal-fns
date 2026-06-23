import { addDaysValue } from './add-days.js';
import { getDayValue } from './helpers/week.js';
import { type DateLike } from './types.js';

/**
 * @summary When is the next day of the week? 0-6 the day of the week, 0 represents Sunday.
 *
 * @description
 * Untyped variant of {@link nextDay} that accepts and returns the `Date | DateLike` union directly,
 * without the overloaded type narrowing.
 *
 * @param date - The date to check
 * @param day - Day of the week
 *
 * @returns The date is the next day of the week
 */
export function nextDayValue(date: Date | DateLike, day: number): Date | DateLike {
  let delta = day - getDayValue(date);
  if (delta <= 0) {
    delta += 7;
  }
  return addDaysValue(date, delta);
}

/**
 * @summary When is the next day of the week? 0-6 the day of the week, 0 represents Sunday.
 *
 * @param date - The date to check
 * @param day - Day of the week
 *
 * @returns The date is the next day of the week
 *
 * @example
 * // When is the next Monday after Mar, 20, 2020?
 * const result = nextDay(new Date(2020, 2, 20), 1)
 * //=> Mon Mar 23 2020 00:00:00
 *
 * @example
 * // When is the next Tuesday after Mar, 21, 2020?
 * const result = nextDay(new Date(2020, 2, 21), 2)
 * //=> Tue Mar 24 2020 00:00:00
 */
export function nextDay(date: Date, day: number): Date;
/**
 * @summary When is the next day of the week? 0-6 the day of the week, 0 represents Sunday.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to check
 * @param day - Day of the week
 *
 * @returns The date is the next day of the week
 *
 * @example
 * // When is the next Monday after Mar, 20, 2020?
 * const result = nextDay(new Date(2020, 2, 20), 1)
 * //=> Mon Mar 23 2020 00:00:00
 *
 * @example
 * // When is the next Tuesday after Mar, 21, 2020?
 * const result = nextDay(new Date(2020, 2, 21), 2)
 * //=> Tue Mar 24 2020 00:00:00
 */
export function nextDay<T extends DateLike>(date: T, day: number): T;
export function nextDay(date: Date | DateLike, day: number): Date | DateLike {
  return nextDayValue(date, day);
}
