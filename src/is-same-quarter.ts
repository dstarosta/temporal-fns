import { compare } from './helpers/compare.js';
import { startOfQuarterValue } from './start-of-quarter.js';
import { type DateLike } from './types.js';

/**
 * @summary Are the given dates in the same quarter (and year)?
 *
 * @description
 * Are the given dates in the same quarter (and year)?
 *
 * Untyped variant of {@link isSameQuarter} that accepts the `Date | DateLike` union directly,
 * without the overloaded type narrowing.
 *
 * @param a - The first date to check
 * @param b - The second date to check
 *
 * @returns The dates are in the same quarter (and year)
 */
export function isSameQuarterValue(a: Date | DateLike, b: Date | DateLike): boolean {
  return compare(startOfQuarterValue(a), startOfQuarterValue(b)) === 0;
}

/**
 * @summary Are the given dates in the same quarter (and year)?
 *
 * @description
 * Are the given dates in the same quarter (and year)?
 *
 * @param a - The first date to check
 * @param b - The second date to check
 *
 * @returns The dates are in the same quarter (and year)
 *
 * @example
 * // Are 1 January 2014 and 8 March 2014 in the same quarter?
 * const result = isSameQuarter(new Date(2014, 0, 1), new Date(2014, 2, 8))
 * //=> true
 *
 * @example
 * // Are 1 January 2014 and 1 January 2015 in the same quarter?
 * const result = isSameQuarter(new Date(2014, 0, 1), new Date(2015, 0, 1))
 * //=> false
 */
export function isSameQuarter(a: Date, b: Date): boolean;
/**
 * @summary Are the given dates in the same quarter (and year)?
 *
 * @description
 * Are the given dates in the same quarter (and year)?
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `a`/`b`, which must share the same concrete type.
 *
 * @param a - The first date to check
 * @param b - The second date to check
 *
 * @returns The dates are in the same quarter (and year)
 *
 * @example
 * // Are 1 January 2014 and 8 March 2014 in the same quarter?
 * const result = isSameQuarter(new Date(2014, 0, 1), new Date(2014, 2, 8))
 * //=> true
 *
 * @example
 * // Are 1 January 2014 and 1 January 2015 in the same quarter?
 * const result = isSameQuarter(new Date(2014, 0, 1), new Date(2015, 0, 1))
 * //=> false
 */
export function isSameQuarter<T extends DateLike>(a: T, b: T): boolean;
export function isSameQuarter(a: Date | DateLike, b: Date | DateLike): boolean {
  return isSameQuarterValue(a, b);
}
