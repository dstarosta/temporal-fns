import { startOfISOWeek } from './start-of-iso-week.js';
import { getISOWeekYearValue } from './helpers/iso-week.js';
import { plainDateResultAs } from './helpers/plain-date-result.js';
import { type DateLike } from './types.js';

/**
 * @summary Return the last day of an ISO week-numbering year for the given date.
 *
 * @description
 * Return the last day of an ISO week-numbering year, which always starts 3 days before the year's
 * first Thursday.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param date - The original date
 *
 * @returns The last day of an ISO week-numbering year
 *
 * @example
 * // The last day of an ISO week-numbering year for 2 July 2005:
 * const result = lastDayOfISOWeekYear(new Date(2005, 6, 2))
 * //=> Sun Jan 01 2006 00:00:00
 */
export function lastDayOfISOWeekYear(date: Date): Date;
/**
 * @summary Return the last day of an ISO week-numbering year for the given date.
 *
 * @description
 * Return the last day of an ISO week-numbering year, which always starts 3 days before the year's
 * first Thursday.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The original date
 *
 * @returns The last day of an ISO week-numbering year
 *
 * @example
 * // The last day of an ISO week-numbering year for 2 July 2005:
 * const result = lastDayOfISOWeekYear(new Date(2005, 6, 2))
 * //=> Sun Jan 01 2006 00:00:00
 */
export function lastDayOfISOWeekYear<T extends DateLike>(date: T): T;
export function lastDayOfISOWeekYear(date: Date | DateLike): Date | DateLike {
  const year = getISOWeekYearValue(date);
  const startOfNextWeekYear = startOfISOWeek(
    Temporal.PlainDate.from({ year: year + 1, month: 1, day: 4 })
  );
  const lastDay = startOfNextWeekYear.subtract({ days: 1 });
  return plainDateResultAs(lastDay, date);
}
