import { createSubTimeUnit } from './helpers/create-add-unit.js';

/**
 * @summary Subtract the specified number of seconds from the given date.
 *
 * @description
 * Subtract the specified number of seconds from the given date.
 *
 * @typeParam T - A `TimeLike` type (`Temporal.PlainDateTime` or `Temporal.ZonedDateTime`).
 * Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param amount - The amount of seconds to be subtracted.
 *
 * @returns The new date with the seconds subtracted
 *
 * @example
 * // Subtract 30 seconds from 10 July 2014 12:45:30:
 * const result = subSeconds(new Date(2014, 6, 10, 12, 45, 30), 30)
 * //=> Thu Jul 10 2014 12:45:00
 */
export const subSeconds = createSubTimeUnit('seconds');
