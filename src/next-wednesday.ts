import { nextDayValue } from './next-day.js';
import { type DateLike } from './types.js';

/**
 * @summary When is the next Wednesday?
 *
 * @description
 * When is the next Wednesday?
 *
 * @param date - The date to start counting from
 *
 * @returns The next Wednesday
 *
 * @example
 * // When is the next Wednesday after Mar, 22, 2020?
 * const result = nextWednesday(new Date(2020, 2, 22))
 * //=> Wed Mar 25 2020 00:00:00
 */
export function nextWednesday(date: Date): Date;
/**
 * @summary When is the next Wednesday?
 *
 * @description
 * When is the next Wednesday?
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to start counting from
 *
 * @returns The next Wednesday
 *
 * @example
 * // When is the next Wednesday after Mar, 22, 2020?
 * const result = nextWednesday(new Date(2020, 2, 22))
 * //=> Wed Mar 25 2020 00:00:00
 */
export function nextWednesday<T extends DateLike>(date: T): T;
export function nextWednesday(date: Date | DateLike): Date | DateLike {
  return nextDayValue(date, 3);
}
