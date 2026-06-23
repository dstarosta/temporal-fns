import { previousDayValue } from './previous-day.js';
import { type DateLike } from './types.js';

/**
 * @summary When is the previous Monday?
 *
 * @description
 * When is the previous Monday?
 *
 * @param date - The date to start counting from
 *
 * @returns The previous Monday
 *
 * @example
 * // When is the previous Monday before Jun, 18, 2021?
 * const result = previousMonday(new Date(2021, 5, 18))
 * //=> Mon June 14 2021 00:00:00
 */
export function previousMonday(date: Date): Date;
/**
 * @summary When is the previous Monday?
 *
 * @description
 * When is the previous Monday?
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to start counting from
 *
 * @returns The previous Monday
 *
 * @example
 * // When is the previous Monday before Jun, 18, 2021?
 * const result = previousMonday(new Date(2021, 5, 18))
 * //=> Mon June 14 2021 00:00:00
 */
export function previousMonday<T extends DateLike>(date: T): T;
export function previousMonday(date: Date | DateLike): Date | DateLike {
  return previousDayValue(date, 1);
}
