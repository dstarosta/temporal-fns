import { withDate } from './helpers/convert.js';
import { zeroBelowMinute } from './helpers/zero-time.js';
import { type TimeLike } from './types.js';

/**
 * @summary Return the start of a minute for the given date.
 *
 * @description
 * Return the start of a minute for the given date.
 *
 * Untyped variant of {@link startOfMinute} that accepts and returns the `Date | TimeLike` union
 * directly, without the overloaded type narrowing.
 *
 * @param date - The original date
 *
 * @returns The start of a minute
 */
export function startOfMinuteValue(date: Date | TimeLike): Date | TimeLike {
  if (date instanceof Date) {
    return withDate(date, (dateTime) => zeroBelowMinute(dateTime));
  }
  return zeroBelowMinute(date);
}

/**
 * @summary Return the start of a minute for the given date.
 *
 * @description
 * Return the start of a minute for the given date.
 *
 * @param date - The original date
 *
 * @returns The start of a minute
 *
 * @example
 * // The start of a minute for 1 December 2014 22:15:45.400:
 * const result = startOfMinute(new Date(2014, 11, 1, 22, 15, 45, 400))
 * //=> Mon Dec 01 2014 22:15:00
 */
export function startOfMinute(date: Date): Date;
/**
 * @summary Return the start of a minute for the given date.
 *
 * @description
 * Return the start of a minute for the given date.
 *
 * @typeParam T - A {@link TimeLike} type (`Temporal.PlainDateTime` or `Temporal.ZonedDateTime`).
 * Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The original date
 *
 * @returns The start of a minute
 *
 * @example
 * // The start of a minute for 1 December 2014 22:15:45.400:
 * const result = startOfMinute(new Date(2014, 11, 1, 22, 15, 45, 400))
 * //=> Mon Dec 01 2014 22:15:00
 */
export function startOfMinute<T extends TimeLike>(date: T): T;
export function startOfMinute(date: Date | TimeLike): Date | TimeLike {
  return startOfMinuteValue(date);
}
