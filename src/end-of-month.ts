import { withDate } from './helpers/convert.js';
import { endTime } from './helpers/zero-time.js';
import { type DateLike } from './types.js';

/**
 * @summary Return the end of a month for the given date.
 *
 * @description
 * Return the end of a month for the given date.
 *
 * @param date - The original date
 *
 * @returns The end of a month
 *
 * @example
 * // The end of a month for 2 September 2014 11:55:00:
 * const result = endOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 30 2014 23:59:59.999
 */
export function endOfMonth(date: Date): Date;
/**
 * @summary Return the end of a month for the given date.
 *
 * @description
 * Return the end of a month for the given date.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The original date
 *
 * @returns The end of a month
 *
 * @example
 * // The end of a month for 2 September 2014 11:55:00:
 * const result = endOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 30 2014 23:59:59.999
 */
export function endOfMonth<T extends DateLike>(date: T): T;
export function endOfMonth(date: Date | DateLike): Date | DateLike {
  if (date instanceof Date) {
    return withDate(date, (dateTime) => endTime(dateTime.with({ day: dateTime.daysInMonth })));
  }
  return endTime(date.with({ day: date.daysInMonth }));
}
