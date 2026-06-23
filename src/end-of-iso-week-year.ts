import { withDate } from './helpers/convert.js';
import { getISOWeekYearValue } from './helpers/iso-week.js';
import { startOfISOWeek } from './start-of-iso-week.js';
import { endTime } from './helpers/zero-time.js';
import { type DateLike } from './types.js';

function lastDayOfISOWeekYearDateTime(year: number): Temporal.PlainDateTime {
  const startOfNextWeekYear = startOfISOWeek(
    Temporal.PlainDate.from({ year: year + 1, month: 1, day: 4 })
  );
  return startOfNextWeekYear.subtract({ days: 1 }).toPlainDateTime();
}

/**
 * @summary Return the end of an ISO week-numbering year for the given date.
 *
 * @description
 * Return the end of an ISO week-numbering year, which always starts 3 days before the year's
 * first Thursday.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param date - The original date
 *
 * @returns The end of an ISO week-numbering year
 *
 * @example
 * // The end of an ISO week-numbering year for 2 July 2005:
 * const result = endOfISOWeekYear(new Date(2005, 6, 2))
 * //=> Sun Jan 01 2006 23:59:59.999
 */
export function endOfISOWeekYear(date: Date): Date;
/**
 * @summary Return the end of an ISO week-numbering year for the given date.
 *
 * @description
 * Return the end of an ISO week-numbering year, which always starts 3 days before the year's
 * first Thursday.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The original date
 *
 * @returns The end of an ISO week-numbering year
 *
 * @example
 * // The end of an ISO week-numbering year for 2 July 2005:
 * const result = endOfISOWeekYear(new Date(2005, 6, 2))
 * //=> Sun Jan 01 2006 23:59:59.999
 */
export function endOfISOWeekYear<T extends DateLike>(date: T): T;
export function endOfISOWeekYear(date: Date | DateLike): Date | DateLike {
  const year = getISOWeekYearValue(date);

  if (date instanceof Date) {
    return withDate(date, () => endTime(lastDayOfISOWeekYearDateTime(year)));
  }
  if (date instanceof Temporal.PlainDate) {
    return endTime(lastDayOfISOWeekYearDateTime(year)).toPlainDate();
  }
  if (date instanceof Temporal.PlainDateTime) {
    return endTime(lastDayOfISOWeekYearDateTime(year));
  }
  return endTime(lastDayOfISOWeekYearDateTime(year)).toZonedDateTime(date.timeZoneId);
}
