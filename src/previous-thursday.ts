import { previousDayValue } from './previous-day.js';
import { type DateLike } from './types.js';

/**
 * @summary When is the previous Thursday?
 *
 * @description
 * When is the previous Thursday?
 *
 * @param date - The date to start counting from
 *
 * @returns The previous Thursday
 *
 * @example
 * // When is the previous Thursday before Jun, 18, 2021?
 * const result = previousThursday(new Date(2021, 5, 18))
 * //=> Thu June 17 2021 00:00:00
 */
export function previousThursday(date: Date): Date;
/**
 * @summary When is the previous Thursday?
 *
 * @description
 * When is the previous Thursday?
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to start counting from
 *
 * @returns The previous Thursday
 *
 * @example
 * // When is the previous Thursday before Jun, 18, 2021?
 * const result = previousThursday(new Date(2021, 5, 18))
 * //=> Thu June 17 2021 00:00:00
 */
export function previousThursday<T extends DateLike>(date: T): T;
export function previousThursday(date: Date | DateLike): Date | DateLike {
  return previousDayValue(date, 4);
}
