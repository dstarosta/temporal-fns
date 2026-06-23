import { createSubTimeUnit } from './helpers/create-add-unit.js';

/**
 * @summary Subtract the specified number of milliseconds from the given date.
 *
 * @description
 * Subtract the specified number of milliseconds from the given date.
 *
 * @typeParam T - A `TimeLike` type (`Temporal.PlainDateTime` or `Temporal.ZonedDateTime`).
 * Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param amount - The amount of milliseconds to be subtracted.
 *
 * @returns The new date with the milliseconds subtracted
 *
 * @example
 * // Subtract 750 milliseconds from 10 July 2014 12:45:30.750:
 * const result = subMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 750), 750)
 * //=> Thu Jul 10 2014 12:45:30.000
 */
export const subMilliseconds = createSubTimeUnit('milliseconds');
