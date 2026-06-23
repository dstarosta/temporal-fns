import { startOfISOWeek } from './start-of-iso-week.js';
import { getISOWeekYearValue } from './helpers/iso-week.js';
import { plainDateResultAs, toPlainDate } from './helpers/plain-date-result.js';
import { type DateLike } from './types.js';

/**
 * @summary Set the ISO week-numbering year to the given date.
 *
 * @description
 * Set the ISO week-numbering year to the given date, saving the week number and the weekday number.
 *
 * Untyped variant of {@link setISOWeekYear} that accepts and returns the `Date | DateLike` union
 * directly, without the overloaded type narrowing.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param date - The date to be changed
 * @param weekYear - The ISO week-numbering year of the new date
 *
 * @returns The new date with the ISO week-numbering year set
 */
export function setISOWeekYearValue(date: Date | DateLike, weekYear: number): Date | DateLike {
  const plainDate = toPlainDate(date);
  const currentStart = startOfISOWeek(
    Temporal.PlainDate.from({ year: getISOWeekYearValue(date), month: 1, day: 4 })
  );
  const dayOffset = plainDate.since(currentStart, { largestUnit: 'days' }).days;

  const targetStart = startOfISOWeek(Temporal.PlainDate.from({ year: weekYear, month: 1, day: 4 }));
  const result = targetStart.add({ days: dayOffset });

  return plainDateResultAs(result, date);
}

/**
 * @summary Set the ISO week-numbering year to the given date.
 *
 * @description
 * Set the ISO week-numbering year to the given date, saving the week number and the weekday number.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param date - The date to be changed
 * @param weekYear - The ISO week-numbering year of the new date
 *
 * @returns The new date with the ISO week-numbering year set
 *
 * @example
 * // Set ISO week-numbering year 2007 to 29 December 2008:
 * const result = setISOWeekYear(new Date(2008, 11, 29), 2007)
 * //=> Mon Jan 01 2007 00:00:00
 */
export function setISOWeekYear(date: Date, weekYear: number): Date;
/**
 * @summary Set the ISO week-numbering year to the given date.
 *
 * @description
 * Set the ISO week-numbering year to the given date, saving the week number and the weekday number.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param weekYear - The ISO week-numbering year of the new date
 *
 * @returns The new date with the ISO week-numbering year set
 *
 * @example
 * // Set ISO week-numbering year 2007 to 29 December 2008:
 * const result = setISOWeekYear(new Date(2008, 11, 29), 2007)
 * //=> Mon Jan 01 2007 00:00:00
 */
export function setISOWeekYear<T extends DateLike>(date: T, weekYear: number): T;
export function setISOWeekYear(date: Date | DateLike, weekYear: number): Date | DateLike {
  return setISOWeekYearValue(date, weekYear);
}
