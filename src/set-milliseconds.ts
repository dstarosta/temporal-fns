import { withDate } from './helpers/convert.js';
import { type TimeLike } from './types.js';

/**
 * @summary Set the milliseconds to the given date.
 *
 * @description
 * Set the milliseconds to the given date.
 *
 * @param date - The date to be changed
 * @param milliseconds - The milliseconds of the new date
 *
 * @returns The new date with the milliseconds set
 *
 * @example
 * // Set 300 milliseconds to 1 September 2014 11:30:40.500:
 * const result = setMilliseconds(new Date(2014, 8, 1, 11, 30, 40, 500), 300)
 * //=> Mon Sep 01 2014 11:30:40.300
 */
export function setMilliseconds(date: Date, milliseconds: number): Date;
/**
 * @summary Set the milliseconds to the given date.
 *
 * @description
 * Set the milliseconds to the given date.
 *
 * @typeParam T - A {@link TimeLike} type (`Temporal.PlainDateTime` or `Temporal.ZonedDateTime`).
 * Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param milliseconds - The milliseconds of the new date
 *
 * @returns The new date with the milliseconds set
 *
 * @example
 * // Set 300 milliseconds to 1 September 2014 11:30:40.500:
 * const result = setMilliseconds(new Date(2014, 8, 1, 11, 30, 40, 500), 300)
 * //=> Mon Sep 01 2014 11:30:40.300
 */
export function setMilliseconds<T extends TimeLike>(date: T, milliseconds: number): T;
export function setMilliseconds(date: Date | TimeLike, milliseconds: number): Date | TimeLike {
  if (date instanceof Date) {
    return withDate(date, (dateTime) => dateTime.with({ millisecond: milliseconds }));
  }
  return date.with({ millisecond: milliseconds });
}
