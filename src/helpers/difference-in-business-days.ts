import { isWeekendDayOfWeek } from './business-days.js';
import { toPlainDate } from './plain-date-result.js';
import { isoDayOfWeekToSundayBased } from './week.js';
import { type DateLike } from '../types.js';

/**
 * @summary Get the number of business days between the given dates.
 *
 * @description
 * Get the number of business day periods between the given dates.
 * Business days being days that aren't in the weekend.
 * Like `differenceInCalendarDays`, the function removes the times from
 * the dates before calculating the difference.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `a`/`b`; both arguments must share the same concrete type.
 *
 * @param a - The later date
 * @param b - The earlier date
 *
 * @returns The number of business days
 *
 * @example
 * // How many business days are between
 * // 10 January 2014 and 20 July 2014?
 * const result = differenceInBusinessDays(
 *   new Date(2014, 6, 20),
 *   new Date(2014, 0, 10)
 * )
 * //=> 136
 *
 * // How many business days are between
 * // 30 November 2021 and 1 November 2021?
 * const result = differenceInBusinessDays(
 *   new Date(2021, 10, 30),
 *   new Date(2021, 10, 1)
 * )
 * //=> 21
 *
 * // How many business days are between
 * // 1 November 2021 and 1 December 2021?
 * const result = differenceInBusinessDays(
 *   new Date(2021, 10, 1),
 *   new Date(2021, 11, 1)
 * )
 * //=> -22
 *
 * // How many business days are between
 * // 1 November 2021 and 1 November 2021 ?
 * const result = differenceInBusinessDays(
 *   new Date(2021, 10, 1),
 *   new Date(2021, 10, 1)
 * )
 * //=> 0
 */
export function differenceInBusinessDays(a: Date, b: Date): number;
export function differenceInBusinessDays<T extends DateLike>(a: T, b: T): number;
export function differenceInBusinessDays(a: Date | DateLike, b: Date | DateLike): number {
  const later = toPlainDate(a);
  const earlier = toPlainDate(b);

  const diff = later.since(earlier, { largestUnit: 'days' }).days;
  const sign = diff < 0 ? -1 : 1;
  const weeks = Math.trunc(diff / 7);

  let result = weeks * 5;
  let movingDate = earlier.add({ days: weeks * 7 });

  while (!movingDate.equals(later)) {
    if (!isWeekendDayOfWeek(isoDayOfWeekToSundayBased(movingDate.dayOfWeek))) {
      result += sign;
    }
    movingDate = movingDate.add({ days: sign });
  }

  return result === 0 ? 0 : result;
}
