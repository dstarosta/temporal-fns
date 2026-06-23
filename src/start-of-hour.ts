import { withDate } from './helpers/convert.js';
import { zeroBelowHour } from './helpers/zero-time.js';
import { type TimeLike } from './types.js';

/**
 * @summary Return the start of an hour for the given date.
 *
 * @description
 * Return the start of an hour for the given date.
 *
 * Untyped variant of {@link startOfHour} that accepts and returns the `Date | TimeLike` union
 * directly, without the overloaded type narrowing.
 *
 * @param date - The original date
 *
 * @returns The start of an hour
 */
export function startOfHourValue(date: Date | TimeLike): Date | TimeLike {
  if (date instanceof Date) {
    return withDate(date, (dateTime) => zeroBelowHour(dateTime));
  }
  return zeroBelowHour(date);
}

/**
 * @summary Return the start of an hour for the given date.
 *
 * @description
 * Return the start of an hour for the given date.
 *
 * @param date - The original date
 *
 * @returns The start of an hour
 *
 * @example
 * // The start of an hour for 2 September 2014 11:55:00:
 * const result = startOfHour(new Date(2014, 8, 2, 11, 55))
 * //=> Tue Sep 02 2014 11:00:00
 */
export function startOfHour(date: Date): Date;
/**
 * @summary Return the start of an hour for the given date.
 *
 * @description
 * Return the start of an hour for the given date.
 *
 * @typeParam T - A {@link TimeLike} type (`Temporal.PlainDateTime` or `Temporal.ZonedDateTime`).
 * Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The original date
 *
 * @returns The start of an hour
 *
 * @example
 * // The start of an hour for 2 September 2014 11:55:00:
 * const result = startOfHour(new Date(2014, 8, 2, 11, 55))
 * //=> Tue Sep 02 2014 11:00:00
 */
export function startOfHour<T extends TimeLike>(date: T): T;
export function startOfHour(date: Date | TimeLike): Date | TimeLike {
  return startOfHourValue(date);
}
