import { withDate } from './helpers/convert.js';
import { type TimeLike } from './types.js';

/**
 * @summary Set the hours to the given date.
 *
 * @description
 * Set the hours to the given date.
 *
 * @param date - The date to be changed
 * @param hours - The hours of the new date
 *
 * @returns The new date with the hours set
 *
 * @example
 * // Set 4 hours to 1 September 2014 11:30:00:
 * const result = setHours(new Date(2014, 8, 1, 11, 30), 4)
 * //=> Mon Sep 01 2014 04:30:00
 */
export function setHours(date: Date, hours: number): Date;
/**
 * @summary Set the hours to the given date.
 *
 * @description
 * Set the hours to the given date.
 *
 * @typeParam T - A {@link TimeLike} type (`Temporal.PlainDateTime` or `Temporal.ZonedDateTime`).
 * Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param hours - The hours of the new date
 *
 * @returns The new date with the hours set
 *
 * @example
 * // Set 4 hours to 1 September 2014 11:30:00:
 * const result = setHours(new Date(2014, 8, 1, 11, 30), 4)
 * //=> Mon Sep 01 2014 04:30:00
 */
export function setHours<T extends TimeLike>(date: T, hours: number): T;
export function setHours(date: Date | TimeLike, hours: number): Date | TimeLike {
  if (date instanceof Date) {
    return withDate(date, (dateTime) => dateTime.with({ hour: hours }));
  }
  return date.with({ hour: hours });
}
