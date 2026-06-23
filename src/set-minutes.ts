import { withDate } from './helpers/convert.js';
import { type TimeLike } from './types.js';

/**
 * @summary Set the minutes to the given date.
 *
 * @description
 * Set the minutes to the given date.
 *
 * @param date - The date to be changed
 * @param minutes - The minutes of the new date
 *
 * @returns The new date with the minutes set
 *
 * @example
 * // Set 45 minutes to 1 September 2014 11:30:40:
 * const result = setMinutes(new Date(2014, 8, 1, 11, 30, 40), 45)
 * //=> Mon Sep 01 2014 11:45:40
 */
export function setMinutes(date: Date, minutes: number): Date;
/**
 * @summary Set the minutes to the given date.
 *
 * @description
 * Set the minutes to the given date.
 *
 * @typeParam T - A {@link TimeLike} type (`Temporal.PlainDateTime` or `Temporal.ZonedDateTime`).
 * Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param minutes - The minutes of the new date
 *
 * @returns The new date with the minutes set
 *
 * @example
 * // Set 45 minutes to 1 September 2014 11:30:40:
 * const result = setMinutes(new Date(2014, 8, 1, 11, 30, 40), 45)
 * //=> Mon Sep 01 2014 11:45:40
 */
export function setMinutes<T extends TimeLike>(date: T, minutes: number): T;
export function setMinutes(date: Date | TimeLike, minutes: number): Date | TimeLike {
  if (date instanceof Date) {
    return withDate(date, (dateTime) => dateTime.with({ minute: minutes }));
  }
  return date.with({ minute: minutes });
}
