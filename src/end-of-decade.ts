import { withDate } from './helpers/convert.js';
import { decadeEndYear } from './helpers/decade.js';
import { endTime } from './helpers/zero-time.js';
import { type DateLike } from './types.js';

/**
 * @summary Return the end of a decade for the given date.
 *
 * @description
 * Return the end of a decade for the given date.
 *
 * @param date - The original date
 *
 * @returns The end of a decade
 *
 * @example
 * // The end of a decade for 12 May 1984 00:00:00:
 * const result = endOfDecade(new Date(1984, 4, 12, 00, 00, 00))
 * //=> Dec 31 1989 23:59:59.999
 */
export function endOfDecade(date: Date): Date;
/**
 * @summary Return the end of a decade for the given date.
 *
 * @description
 * Return the end of a decade for the given date.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The original date
 *
 * @returns The end of a decade
 *
 * @example
 * // The end of a decade for 12 May 1984 00:00:00:
 * const result = endOfDecade(new Date(1984, 4, 12, 00, 00, 00))
 * //=> Dec 31 1989 23:59:59.999
 */
export function endOfDecade<T extends DateLike>(date: T): T;
export function endOfDecade(date: Date | DateLike): Date | DateLike {
  if (date instanceof Date) {
    return withDate(date, (dateTime) =>
      endTime(dateTime.with({ year: decadeEndYear(dateTime.year), month: 12, day: 31 }))
    );
  }
  return endTime(date.with({ year: decadeEndYear(date.year), month: 12, day: 31 }));
}
