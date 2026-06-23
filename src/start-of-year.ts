import { withDate } from './helpers/convert.js';
import { zeroTime } from './helpers/zero-time.js';
import { type DateLike } from './types.js';

/**
 * @summary Return the start of a year for the given date.
 *
 * @description
 * Return the start of a year for the given date.
 *
 * Untyped variant of {@link startOfYear} that accepts and returns the `Date | DateLike` union
 * directly, without the overloaded type narrowing.
 *
 * @param date - The original date
 *
 * @returns The start of a year
 */
export function startOfYearValue(date: Date | DateLike): Date | DateLike {
  if (date instanceof Date) {
    return withDate(date, (dateTime) => zeroTime(dateTime.with({ month: 1, day: 1 })));
  }
  return zeroTime(date.with({ month: 1, day: 1 }));
}

/**
 * @summary Return the start of a year for the given date.
 *
 * @description
 * Return the start of a year for the given date.
 *
 * @param date - The original date
 *
 * @returns The start of a year
 *
 * @example
 * // The start of a year for 2 September 2014 11:55:00:
 * const result = startOfYear(new Date(2014, 8, 2, 11, 55, 00))
 * //=> Wed Jan 01 2014 00:00:00
 */
export function startOfYear(date: Date): Date;
/**
 * @summary Return the start of a year for the given date.
 *
 * @description
 * Return the start of a year for the given date.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The original date
 *
 * @returns The start of a year
 *
 * @example
 * // The start of a year for 2 September 2014 11:55:00:
 * const result = startOfYear(new Date(2014, 8, 2, 11, 55, 00))
 * //=> Wed Jan 01 2014 00:00:00
 */
export function startOfYear<T extends DateLike>(date: T): T;
export function startOfYear(date: Date | DateLike): Date | DateLike {
  return startOfYearValue(date);
}
