import { nextDayValue } from './next-day.js';
import { type DateLike } from './types.js';

/**
 * @summary When is the next Sunday?
 *
 * @description
 * When is the next Sunday?
 *
 * @param date - The date to start counting from
 *
 * @returns The next Sunday
 *
 * @example
 * // When is the next Sunday after March 22, 2020?
 * const result = nextSunday(new Date(2020, 2, 22))
 * //=> Sun Mar 29 2020 00:00:00
 */
export function nextSunday(date: Date): Date;
/**
 * @summary When is the next Sunday?
 *
 * @description
 * When is the next Sunday?
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to start counting from
 *
 * @returns The next Sunday
 *
 * @example
 * // When is the next Sunday after March 22, 2020?
 * const result = nextSunday(new Date(2020, 2, 22))
 * //=> Sun Mar 29 2020 00:00:00
 */
export function nextSunday<T extends DateLike>(date: T): T;
export function nextSunday(date: Date | DateLike): Date | DateLike {
  return nextDayValue(date, 0);
}
