import { withDate } from './helpers/convert.js';
import { quarterEndMonth } from './helpers/quarter.js';
import { endTime } from './helpers/zero-time.js';
import { type DateLike } from './types.js';

/**
 * @summary Return the end of a year quarter for the given date.
 *
 * @description
 * Return the end of a year quarter for the given date.
 *
 * @param date - The original date
 *
 * @returns The end of a quarter
 *
 * @example
 * // The end of a quarter for 2 September 2014 11:55:00:
 * const result = endOfQuarter(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 30 2014 23:59:59.999
 */
export function endOfQuarter(date: Date): Date;
/**
 * @summary Return the end of a year quarter for the given date.
 *
 * @description
 * Return the end of a year quarter for the given date.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The original date
 *
 * @returns The end of a quarter
 *
 * @example
 * // The end of a quarter for 2 September 2014 11:55:00:
 * const result = endOfQuarter(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 30 2014 23:59:59.999
 */
export function endOfQuarter<T extends DateLike>(date: T): T;
export function endOfQuarter(date: Date | DateLike): Date | DateLike {
  if (date instanceof Date) {
    return withDate(date, (dateTime) => {
      const month = quarterEndMonth(dateTime.month);
      const day = dateTime.with({ month, day: 1 }).daysInMonth;
      return endTime(dateTime.with({ month, day }));
    });
  }
  const month = quarterEndMonth(date.month);
  const day = date.with({ month, day: 1 }).daysInMonth;
  return endTime(date.with({ month, day }));
}
