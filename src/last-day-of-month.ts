import { withDate } from './helpers/convert.js';
import { zeroTime } from './helpers/zero-time.js';
import { type DateLike } from './types.js';

/**
 * @summary Return the last day of a month for the given date.
 *
 * @description
 * Return the last day of a month for the given date.
 *
 * @param date - The original date
 *
 * @returns The last day of a month
 *
 * @example
 * // The last day of a month for 2 September 2014 11:55:00:
 * const result = lastDayOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 30 2014 00:00:00
 */
export function lastDayOfMonth(date: Date): Date;
/**
 * @summary Return the last day of a month for the given date.
 *
 * @description
 * Return the last day of a month for the given date.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The original date
 *
 * @returns The last day of a month
 *
 * @example
 * // The last day of a month for 2 September 2014 11:55:00:
 * const result = lastDayOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 30 2014 00:00:00
 */
export function lastDayOfMonth<T extends DateLike>(date: T): T;
export function lastDayOfMonth(date: Date | DateLike): Date | DateLike {
  if (date instanceof Date) {
    return withDate(date, (dateTime) => zeroTime(dateTime.with({ day: dateTime.daysInMonth })));
  }
  return zeroTime(date.with({ day: date.daysInMonth }));
}
