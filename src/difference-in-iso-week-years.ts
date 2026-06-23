import { subISOWeekYearsValue } from './sub-iso-week-years.js';
import { compare } from './helpers/compare.js';
import { getISOWeekYearValue } from './helpers/iso-week.js';
import { type DateLike } from './types.js';

/**
 * @summary Get the number of full ISO week-numbering years between the given dates.
 *
 * @description
 * Get the number of full ISO week-numbering years between the given dates.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param a - The later date
 * @param b - The earlier date
 *
 * @returns The number of full ISO week-numbering years
 *
 * @example
 * // How many full ISO week-numbering years are between 1 January 2010 and 1 January 2012?
 * const result = differenceInISOWeekYears(
 *   new Date(2012, 0, 1),
 *   new Date(2010, 0, 1)
 * )
 * // => 1
 */
export function differenceInISOWeekYears(a: Date, b: Date): number;
/**
 * @summary Get the number of full ISO week-numbering years between the given dates.
 *
 * @description
 * Get the number of full ISO week-numbering years between the given dates.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `a`/`b`; both arguments must share the same concrete type.
 *
 * @param a - The later date
 * @param b - The earlier date
 *
 * @returns The number of full ISO week-numbering years
 *
 * @example
 * // How many full ISO week-numbering years are between 1 January 2010 and 1 January 2012?
 * const result = differenceInISOWeekYears(
 *   new Date(2012, 0, 1),
 *   new Date(2010, 0, 1)
 * )
 * // => 1
 */
export function differenceInISOWeekYears<T extends DateLike>(a: T, b: T): number;
export function differenceInISOWeekYears(a: Date | DateLike, b: Date | DateLike): number {
  const sign = compare(a, b);
  const diff = Math.abs(getISOWeekYearValue(a) - getISOWeekYearValue(b));

  const adjustedDate = subISOWeekYearsValue(a, sign * diff);

  const isLastISOWeekYearNotFull = compare(adjustedDate, b) === -sign ? 1 : 0;
  const result = sign * (diff - isLastISOWeekYearNotFull);
  return result === 0 ? 0 : result;
}
