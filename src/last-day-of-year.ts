import { withDate } from './helpers/convert.js';
import { zeroTime } from './helpers/zero-time.js';
import { type DateLike } from './types.js';

/**
 * @summary Return the last day of a year for the given date.
 *
 * @description
 * Return the last day of a year for the given date.
 *
 * @param date - The original date
 *
 * @returns The last day of a year
 *
 * @example
 * // The last day of a year for 2 September 2014 11:55:00:
 * const result = lastDayOfYear(new Date(2014, 8, 2, 11, 55, 00))
 * //=> Wed Dec 31 2014 00:00:00
 */
export function lastDayOfYear(date: Date): Date;
/**
 * @summary Return the last day of a year for the given date.
 *
 * @description
 * Return the last day of a year for the given date.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The original date
 *
 * @returns The last day of a year
 *
 * @example
 * // The last day of a year for 2 September 2014 11:55:00:
 * const result = lastDayOfYear(new Date(2014, 8, 2, 11, 55, 00))
 * //=> Wed Dec 31 2014 00:00:00
 */
export function lastDayOfYear<T extends DateLike>(date: T): T;
export function lastDayOfYear(date: Date | DateLike): Date | DateLike {
  if (date instanceof Date) {
    return withDate(date, (dateTime) => zeroTime(dateTime.with({ month: 12, day: 31 })));
  }
  return zeroTime(date.with({ month: 12, day: 31 }));
}
