import { withDate } from './helpers/convert.js';
import { type TimeLike } from './types.js';

/**
 * @summary Set the seconds to the given date.
 *
 * @description
 * Set the seconds to the given date.
 *
 * @param date - The date to be changed
 * @param seconds - The seconds of the new date
 *
 * @returns The new date with the seconds set
 *
 * @example
 * // Set 45 seconds to 1 September 2014 11:30:40:
 * const result = setSeconds(new Date(2014, 8, 1, 11, 30, 40), 45)
 * //=> Mon Sep 01 2014 11:30:45
 */
export function setSeconds(date: Date, seconds: number): Date;
/**
 * @summary Set the seconds to the given date.
 *
 * @description
 * Set the seconds to the given date.
 *
 * @typeParam T - A {@link TimeLike} type (`Temporal.PlainDateTime` or `Temporal.ZonedDateTime`).
 * Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param seconds - The seconds of the new date
 *
 * @returns The new date with the seconds set
 *
 * @example
 * // Set 45 seconds to 1 September 2014 11:30:40:
 * const result = setSeconds(new Date(2014, 8, 1, 11, 30, 40), 45)
 * //=> Mon Sep 01 2014 11:30:45
 */
export function setSeconds<T extends TimeLike>(date: T, seconds: number): T;
export function setSeconds(date: Date | TimeLike, seconds: number): Date | TimeLike {
  if (date instanceof Date) {
    return withDate(date, (dateTime) => dateTime.with({ second: seconds }));
  }
  return date.with({ second: seconds });
}
