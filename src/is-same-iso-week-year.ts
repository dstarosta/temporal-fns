import { compare } from './helpers/compare.js';
import { startOfISOWeekYear } from './start-of-iso-week-year.js';
import { type DateLike } from './types.js';

/**
 * @summary Are the given dates in the same ISO week-numbering year?
 *
 * @description
 * Are the given dates in the same ISO week-numbering year?
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param a - The first date to check
 * @param b - The second date to check
 *
 * @returns The dates are in the same ISO week-numbering year
 *
 * @example
 * // Are 29 December 2003 and 2 January 2005 in the same ISO week-numbering year?
 * const result = isSameISOWeekYear(new Date(2003, 11, 29), new Date(2005, 0, 2))
 * //=> true
 */
export function isSameISOWeekYear(a: Date, b: Date): boolean;
/**
 * @summary Are the given dates in the same ISO week-numbering year?
 *
 * @description
 * Are the given dates in the same ISO week-numbering year?
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `a`/`b`, which must share the same concrete type.
 *
 * @param a - The first date to check
 * @param b - The second date to check
 *
 * @returns The dates are in the same ISO week-numbering year
 *
 * @example
 * // Are 29 December 2003 and 2 January 2005 in the same ISO week-numbering year?
 * const result = isSameISOWeekYear(new Date(2003, 11, 29), new Date(2005, 0, 2))
 * //=> true
 */
export function isSameISOWeekYear<T extends DateLike>(a: T, b: T): boolean;
export function isSameISOWeekYear(a: Date | DateLike, b: Date | DateLike): boolean {
  if (a instanceof Date && b instanceof Date) {
    return compare(startOfISOWeekYear(a), startOfISOWeekYear(b)) === 0;
  }
  return compare(startOfISOWeekYear(a as DateLike), startOfISOWeekYear(b as DateLike)) === 0;
}
