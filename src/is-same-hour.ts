import { compare } from './helpers/compare.js';
import { startOfHourValue } from './start-of-hour.js';
import { type TimeLike } from './types.js';

/**
 * @summary Are the given dates in the same hour (and same day)?
 *
 * @description
 * Are the given dates in the same hour (and same day)?
 *
 * Untyped variant of {@link isSameHour} that accepts the `Date | TimeLike` union directly,
 * without the overloaded type narrowing.
 *
 * @param a - The first date to check
 * @param b - The second date to check
 *
 * @returns The dates are in the same hour (and same day)
 */
export function isSameHourValue(a: Date | TimeLike, b: Date | TimeLike): boolean {
  return compare(startOfHourValue(a), startOfHourValue(b)) === 0;
}

/**
 * @summary Are the given dates in the same hour (and same day)?
 *
 * @description
 * Are the given dates in the same hour (and same day)?
 *
 * @param a - The first date to check
 * @param b - The second date to check
 *
 * @returns The dates are in the same hour (and same day)
 *
 * @example
 * // Are 4 September 2014 06:00:00 and 4 September 06:30:00 in the same hour?
 * const result = isSameHour(new Date(2014, 8, 4, 6, 0), new Date(2014, 8, 4, 6, 30))
 * //=> true
 *
 * @example
 * // Are 4 September 2014 06:00:00 and 5 September 06:00:00 in the same hour?
 * const result = isSameHour(new Date(2014, 8, 4, 6, 0), new Date(2014, 8, 5, 6, 0))
 * //=> false
 */
export function isSameHour(a: Date, b: Date): boolean;
/**
 * @summary Are the given dates in the same hour (and same day)?
 *
 * @description
 * Are the given dates in the same hour (and same day)?
 *
 * @typeParam T - A {@link TimeLike} type (`Temporal.PlainDateTime` or `Temporal.ZonedDateTime`).
 * Inferred from `a`/`b`, which must share the same concrete type.
 *
 * @param a - The first date to check
 * @param b - The second date to check
 *
 * @returns The dates are in the same hour (and same day)
 *
 * @example
 * // Are 4 September 2014 06:00:00 and 4 September 06:30:00 in the same hour?
 * const result = isSameHour(new Date(2014, 8, 4, 6, 0), new Date(2014, 8, 4, 6, 30))
 * //=> true
 *
 * @example
 * // Are 4 September 2014 06:00:00 and 5 September 06:00:00 in the same hour?
 * const result = isSameHour(new Date(2014, 8, 4, 6, 0), new Date(2014, 8, 5, 6, 0))
 * //=> false
 */
export function isSameHour<T extends TimeLike>(a: T, b: T): boolean;
export function isSameHour(a: Date | TimeLike, b: Date | TimeLike): boolean {
  return isSameHourValue(a, b);
}
