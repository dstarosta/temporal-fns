import { withDate } from './helpers/convert.js';
import { endTime } from './helpers/zero-time.js';
import { type DateLike } from './types.js';

/**
 * @summary Return the end of a year for the given date.
 *
 * @description
 * Return the end of a year for the given date.
 *
 * @param date - The original date
 *
 * @returns The end of a year
 *
 * @example
 * // The end of a year for 2 September 2014 11:55:00:
 * const result = endOfYear(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Wed Dec 31 2014 23:59:59.999
 */
export function endOfYear(date: Date): Date;
/**
 * @summary Return the end of a year for the given date.
 *
 * @description
 * Return the end of a year for the given date.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The original date
 *
 * @returns The end of a year
 *
 * @example
 * // The end of a year for 2 September 2014 11:55:00:
 * const result = endOfYear(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Wed Dec 31 2014 23:59:59.999
 */
export function endOfYear<T extends DateLike>(date: T): T;
export function endOfYear(date: Date | DateLike): Date | DateLike {
  if (date instanceof Date) {
    return withDate(date, (dateTime) => endTime(dateTime.with({ month: 12, day: 31 })));
  }
  return endTime(date.with({ month: 12, day: 31 }));
}
