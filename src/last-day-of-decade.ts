import { withDate } from './helpers/convert.js';
import { decadeEndYear } from './helpers/decade.js';
import { zeroTime } from './helpers/zero-time.js';
import { type DateLike } from './types.js';

/**
 * @summary Return the last day of a decade for the given date.
 *
 * @description
 * Return the last day of a decade for the given date.
 *
 * @param date - The original date
 *
 * @returns The last day of a decade
 *
 * @example
 * // The last day of a decade for 21 December 2012 21:12:00:
 * const result = lastDayOfDecade(new Date(2012, 11, 21, 21, 12, 00))
 * //=> Wed Dec 31 2019 00:00:00
 */
export function lastDayOfDecade(date: Date): Date;
/**
 * @summary Return the last day of a decade for the given date.
 *
 * @description
 * Return the last day of a decade for the given date.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The original date
 *
 * @returns The last day of a decade
 *
 * @example
 * // The last day of a decade for 21 December 2012 21:12:00:
 * const result = lastDayOfDecade(new Date(2012, 11, 21, 21, 12, 00))
 * //=> Wed Dec 31 2019 00:00:00
 */
export function lastDayOfDecade<T extends DateLike>(date: T): T;
export function lastDayOfDecade(date: Date | DateLike): Date | DateLike {
  if (date instanceof Date) {
    return withDate(date, (dateTime) =>
      zeroTime(dateTime.with({ year: decadeEndYear(dateTime.year), month: 12, day: 31 }))
    );
  }
  return zeroTime(date.with({ year: decadeEndYear(date.year), month: 12, day: 31 }));
}
