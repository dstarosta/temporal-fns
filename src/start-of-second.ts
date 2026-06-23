import { withDate } from './helpers/convert.js';
import { zeroBelowSecond } from './helpers/zero-time.js';
import { type TimeLike } from './types.js';

/**
 * @summary Return the start of a second for the given date.
 *
 * @description
 * Return the start of a second for the given date.
 *
 * Untyped variant of {@link startOfSecond} that accepts and returns the `Date | TimeLike` union
 * directly, without the overloaded type narrowing.
 *
 * @param date - The original date
 *
 * @returns The start of a second
 */
export function startOfSecondValue(date: Date | TimeLike): Date | TimeLike {
  if (date instanceof Date) {
    return withDate(date, (dateTime) => zeroBelowSecond(dateTime));
  }
  return zeroBelowSecond(date);
}

/**
 * @summary Return the start of a second for the given date.
 *
 * @description
 * Return the start of a second for the given date.
 *
 * @param date - The original date
 *
 * @returns The start of a second
 *
 * @example
 * // The start of a second for 1 December 2014 22:15:45.400:
 * const result = startOfSecond(new Date(2014, 11, 1, 22, 15, 45, 400))
 * //=> Mon Dec 01 2014 22:15:45.000
 */
export function startOfSecond(date: Date): Date;
/**
 * @summary Return the start of a second for the given date.
 *
 * @description
 * Return the start of a second for the given date.
 *
 * @typeParam T - A {@link TimeLike} type (`Temporal.PlainDateTime` or `Temporal.ZonedDateTime`).
 * Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The original date
 *
 * @returns The start of a second
 *
 * @example
 * // The start of a second for 1 December 2014 22:15:45.400:
 * const result = startOfSecond(new Date(2014, 11, 1, 22, 15, 45, 400))
 * //=> Mon Dec 01 2014 22:15:45.000
 */
export function startOfSecond<T extends TimeLike>(date: T): T;
export function startOfSecond(date: Date | TimeLike): Date | TimeLike {
  return startOfSecondValue(date);
}
