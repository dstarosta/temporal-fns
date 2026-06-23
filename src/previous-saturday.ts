import { previousDayValue } from './previous-day.js';
import { type DateLike } from './types.js';

/**
 * @summary When is the previous Saturday?
 *
 * @description
 * When is the previous Saturday?
 *
 * @param date - The date to start counting from
 *
 * @returns The previous Saturday
 *
 * @example
 * // When is the previous Saturday before Jun, 20, 2021?
 * const result = previousSaturday(new Date(2021, 5, 20))
 * //=> Sat June 19 2021 00:00:00
 */
export function previousSaturday(date: Date): Date;
/**
 * @summary When is the previous Saturday?
 *
 * @description
 * When is the previous Saturday?
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to start counting from
 *
 * @returns The previous Saturday
 *
 * @example
 * // When is the previous Saturday before Jun, 20, 2021?
 * const result = previousSaturday(new Date(2021, 5, 20))
 * //=> Sat June 19 2021 00:00:00
 */
export function previousSaturday<T extends DateLike>(date: T): T;
export function previousSaturday(date: Date | DateLike): Date | DateLike {
  return previousDayValue(date, 6);
}
