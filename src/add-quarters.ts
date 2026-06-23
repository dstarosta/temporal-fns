import { addMonths } from './add-months.js';
import { type DateLike } from './types.js';

/**
 * @summary Add the specified number of year quarters to the given date.
 *
 * @description
 * Add the specified number of year quarters to the given date.
 *
 * @param date - The date to be changed
 * @param amount - The amount of quarters to be added.
 *
 * @returns The new date with the quarters added
 *
 * @example
 * // Add 1 quarter to 1 September 2014:
 * const result = addQuarters(new Date(2014, 8, 1), 1)
 * //=> Mon Dec 01 2014 00:00:00
 */
export function addQuarters(date: Date, amount: number): Date;
/**
 * @summary Add the specified number of year quarters to the given date.
 *
 * @description
 * Add the specified number of year quarters to the given date.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param amount - The amount of quarters to be added.
 *
 * @returns The new date with the quarters added
 *
 * @example
 * // Add 1 quarter to 1 September 2014:
 * const result = addQuarters(new Date(2014, 8, 1), 1)
 * //=> Mon Dec 01 2014 00:00:00
 */
export function addQuarters<T extends DateLike>(date: T, amount: number): T;
export function addQuarters(date: Date | DateLike, amount: number): Date | DateLike {
  if (date instanceof Date) {
    return addMonths(date, amount * 3);
  }
  return addMonths(date, amount * 3);
}
