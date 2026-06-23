import { previousDayValue } from './previous-day.js';
import { type DateLike } from './types.js';

/**
 * @summary When is the previous Tuesday?
 *
 * @description
 * When is the previous Tuesday?
 *
 * @param date - The date to start counting from
 *
 * @returns The previous Tuesday
 *
 * @example
 * // When is the previous Tuesday before Jun, 18, 2021?
 * const result = previousTuesday(new Date(2021, 5, 18))
 * //=> Tue June 15 2021 00:00:00
 */
export function previousTuesday(date: Date): Date;
/**
 * @summary When is the previous Tuesday?
 *
 * @description
 * When is the previous Tuesday?
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to start counting from
 *
 * @returns The previous Tuesday
 *
 * @example
 * // When is the previous Tuesday before Jun, 18, 2021?
 * const result = previousTuesday(new Date(2021, 5, 18))
 * //=> Tue June 15 2021 00:00:00
 */
export function previousTuesday<T extends DateLike>(date: T): T;
export function previousTuesday(date: Date | DateLike): Date | DateLike {
  return previousDayValue(date, 2);
}
