import { createAddDateLikeUnit, createSubDateUnit } from './helpers/create-add-unit.js';
import { type DateLike } from './types.js';

/**
 * @summary Subtract the specified number of days from the given date.
 *
 * @description
 * Subtract the specified number of days from the given date.
 *
 * Untyped variant of {@link subDays} that accepts and returns the `Date | DateLike` union directly,
 * without the overloaded type narrowing.
 *
 * @param date - The date to be changed
 * @param amount - The amount of days to be subtracted.
 *
 * @returns The new date with the days subtracted
 */
export const subDaysValue: (date: Date | DateLike, amount: number) => Date | DateLike =
  createAddDateLikeUnit('days', -1);

/**
 * @summary Subtract the specified number of days from the given date.
 *
 * @description
 * Subtract the specified number of days from the given date.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param amount - The amount of days to be subtracted.
 *
 * @returns The new date with the days subtracted
 *
 * @example
 * // Subtract 10 days from 1 September 2014:
 * const result = subDays(new Date(2014, 8, 1), 10)
 * //=> Fri Aug 22 2014 00:00:00
 */
export const subDays = createSubDateUnit('days');
