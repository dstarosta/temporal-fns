import { eachWeekendOfInterval } from './each-weekend-of-interval.js';
import { endOfYear } from './end-of-year.js';
import { startOfYear } from './start-of-year.js';
import { type DateLike } from './types.js';

/**
 * @summary List all the Saturdays and Sundays in the year.
 *
 * @description
 * Get all the Saturdays and Sundays in the year.
 *
 * @param date - The given year
 *
 * @returns An array containing all the Saturdays and Sundays
 *
 * @example
 * // Lists all Saturdays and Sundays in the year
 * const result = eachWeekendOfYear(new Date(2020, 1, 1))
 * //=> [
 * //   Sat Jan 03 2020 00:00:00,
 * //   Sun Jan 04 2020 00:00:00,
 * //   ...
 * //   Sun Dec 27 2020 00:00:00
 * // ]
 */
export function eachWeekendOfYear(date: Date): Date[];
/**
 * @summary List all the Saturdays and Sundays in the year.
 *
 * @description
 * Get all the Saturdays and Sundays in the year.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result array has the same concrete type.
 *
 * @param date - The given year
 *
 * @returns An array containing all the Saturdays and Sundays
 *
 * @example
 * // Lists all Saturdays and Sundays in the year
 * const result = eachWeekendOfYear(new Date(2020, 1, 1))
 * //=> [
 * //   Sat Jan 03 2020 00:00:00,
 * //   Sun Jan 04 2020 00:00:00,
 * //   ...
 * //   Sun Dec 27 2020 00:00:00
 * // ]
 */
export function eachWeekendOfYear<T extends DateLike>(date: T): T[];
export function eachWeekendOfYear(date: Date | DateLike): (Date | DateLike)[] {
  if (date instanceof Date) {
    return eachWeekendOfInterval({ start: startOfYear(date), end: endOfYear(date) });
  }
  return eachWeekendOfInterval({ start: startOfYear(date), end: endOfYear(date) });
}
