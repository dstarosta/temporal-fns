import { nextDayValue } from './next-day.js';
import { type DateLike } from './types.js';

/**
 * @summary When is the next Friday?
 *
 * @description
 * When is the next Friday?
 *
 * @param date - The date to start counting from
 *
 * @returns The next Friday
 *
 * @example
 * // When is the next Friday after Mar, 22, 2020?
 * const result = nextFriday(new Date(2020, 2, 22))
 * //=> Fri Mar 27 2020 00:00:00
 */
export function nextFriday(date: Date): Date;
/**
 * @summary When is the next Friday?
 *
 * @description
 * When is the next Friday?
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to start counting from
 *
 * @returns The next Friday
 *
 * @example
 * // When is the next Friday after Mar, 22, 2020?
 * const result = nextFriday(new Date(2020, 2, 22))
 * //=> Fri Mar 27 2020 00:00:00
 */
export function nextFriday<T extends DateLike>(date: T): T;
export function nextFriday(date: Date | DateLike): Date | DateLike {
  return nextDayValue(date, 5);
}
