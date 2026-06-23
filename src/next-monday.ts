import { nextDayValue } from './next-day.js';
import { type DateLike } from './types.js';

/**
 * @summary When is the next Monday?
 *
 * @description
 * When is the next Monday?
 *
 * @param date - The date to start counting from
 *
 * @returns The next Monday
 *
 * @example
 * // When is the next Monday after Mar, 22, 2020?
 * const result = nextMonday(new Date(2020, 2, 22))
 * //=> Mon Mar 23 2020 00:00:00
 */
export function nextMonday(date: Date): Date;
/**
 * @summary When is the next Monday?
 *
 * @description
 * When is the next Monday?
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to start counting from
 *
 * @returns The next Monday
 *
 * @example
 * // When is the next Monday after Mar, 22, 2020?
 * const result = nextMonday(new Date(2020, 2, 22))
 * //=> Mon Mar 23 2020 00:00:00
 */
export function nextMonday<T extends DateLike>(date: T): T;
export function nextMonday(date: Date | DateLike): Date | DateLike {
  return nextDayValue(date, 1);
}
