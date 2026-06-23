import { withDate } from './helpers/convert.js';
import { type DateLike } from './types.js';

// date-fns setMonth takes a 0-indexed month (Jan = 0) and clamps the day to
// the target month's length (e.g. Jan 31 set to month 1 (Feb) becomes Feb 28)
// — this matches Temporal's default 'constrain' overflow on .with({ month }).
/**
 * @summary Set the month to the given date.
 *
 * @description
 * Set the month to the given date.
 *
 * @param date - The date to be changed
 * @param month - The month index to set (0-11)
 *
 * @returns The new date with the month set
 *
 * @example
 * // Set February to 1 September 2014:
 * const result = setMonth(new Date(2014, 8, 1), 1)
 * //=> Sat Feb 01 2014 00:00:00
 */
export function setMonth(date: Date, month: number): Date;
/**
 * @summary Set the month to the given date.
 *
 * @description
 * Set the month to the given date.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param month - The month index to set (0-11)
 *
 * @returns The new date with the month set
 *
 * @example
 * // Set February to 1 September 2014:
 * const result = setMonth(new Date(2014, 8, 1), 1)
 * //=> Sat Feb 01 2014 00:00:00
 */
export function setMonth<T extends DateLike>(date: T, month: number): T;
export function setMonth(date: Date | DateLike, month: number): Date | DateLike {
  if (date instanceof Date) {
    return withDate(date, (dateTime) => dateTime.with({ month: month + 1 }));
  }
  return date.with({ month: month + 1 });
}
