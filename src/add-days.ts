import { createAddDateLikeUnit, createAddDateUnit } from './helpers/create-add-unit.js';
import { type DateLike } from './types.js';

/**
 * @summary Add the specified number of days to the given date.
 *
 * @description
 * Add the specified number of days to the given date.
 *
 * Untyped variant of {@link addDays} that accepts and returns the `Date | DateLike` union directly,
 * without the overloaded type narrowing.
 *
 * @param date - The date to be changed
 * @param amount - The amount of days to be added.
 *
 * @returns The new date with the days added
 */
export const addDaysValue: (date: Date | DateLike, amount: number) => Date | DateLike =
  createAddDateLikeUnit('days', 1);

/**
 * @summary Add the specified number of days to the given date.
 *
 * @description
 * Add the specified number of days to the given date.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param amount - The amount of days to be added.
 *
 * @returns The new date with the days added
 *
 * @example
 * // Add 10 days to 1 September 2014:
 * const result = addDays(new Date(2014, 8, 1), 10)
 * //=> Thu Sep 11 2014 00:00:00
 */
export const addDays = createAddDateUnit('days');
