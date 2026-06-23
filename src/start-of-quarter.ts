import { withDate } from './helpers/convert.js';
import { quarterStartMonth } from './helpers/quarter.js';
import { zeroTime } from './helpers/zero-time.js';
import { type DateLike } from './types.js';

/**
 * @summary Return the start of a year quarter for the given date.
 *
 * @description
 * Return the start of a year quarter for the given date.
 *
 * Untyped variant of {@link startOfQuarter} that accepts and returns the `Date | DateLike` union
 * directly, without the overloaded type narrowing.
 *
 * @param date - The original date
 *
 * @returns The start of a quarter
 */
export function startOfQuarterValue(date: Date | DateLike): Date | DateLike {
  if (date instanceof Date) {
    return withDate(date, (dateTime) =>
      zeroTime(dateTime.with({ month: quarterStartMonth(dateTime.month), day: 1 }))
    );
  }
  return zeroTime(date.with({ month: quarterStartMonth(date.month), day: 1 }));
}

/**
 * @summary Return the start of a year quarter for the given date.
 *
 * @description
 * Return the start of a year quarter for the given date.
 *
 * @param date - The original date
 *
 * @returns The start of a quarter
 *
 * @example
 * // The start of a quarter for 2 September 2014 11:55:00:
 * const result = startOfQuarter(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Jul 01 2014 00:00:00
 */
export function startOfQuarter(date: Date): Date;
/**
 * @summary Return the start of a year quarter for the given date.
 *
 * @description
 * Return the start of a year quarter for the given date.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The original date
 *
 * @returns The start of a quarter
 *
 * @example
 * // The start of a quarter for 2 September 2014 11:55:00:
 * const result = startOfQuarter(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Jul 01 2014 00:00:00
 */
export function startOfQuarter<T extends DateLike>(date: T): T;
export function startOfQuarter(date: Date | DateLike): Date | DateLike {
  return startOfQuarterValue(date);
}
