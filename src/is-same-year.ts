import { assertSameType } from './helpers/assert-same-type.js';
import { type DateLike } from './types.js';

/**
 * @summary Are the given dates in the same year?
 *
 * @description
 * Are the given dates in the same year?
 *
 * Untyped variant of {@link isSameYear} that accepts the `Date | DateLike` union directly,
 * without the overloaded type narrowing.
 *
 * @param a - The first date to check
 * @param b - The second date to check
 *
 * @returns The dates are in the same year
 */
export function isSameYearValue(a: Date | DateLike, b: Date | DateLike): boolean {
  if (a instanceof Date && b instanceof Date) {
    return a.getFullYear() === b.getFullYear();
  }
  assertSameType(a as DateLike, b as DateLike);
  return (a as DateLike).year === (b as DateLike).year;
}

/**
 * @summary Are the given dates in the same year?
 *
 * @description
 * Are the given dates in the same year?
 *
 * @param a - The first date to check
 * @param b - The second date to check
 *
 * @returns The dates are in the same year
 *
 * @example
 * // Are 2 September 2014 and 25 September 2014 in the same year?
 * const result = isSameYear(new Date(2014, 8, 2), new Date(2014, 8, 25))
 * //=> true
 */
export function isSameYear(a: Date, b: Date): boolean;
/**
 * @summary Are the given dates in the same year?
 *
 * @description
 * Are the given dates in the same year?
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `a`/`b`, which must share the same concrete type.
 *
 * @param a - The first date to check
 * @param b - The second date to check
 *
 * @returns The dates are in the same year
 *
 * @example
 * // Are 2 September 2014 and 25 September 2014 in the same year?
 * const result = isSameYear(new Date(2014, 8, 2), new Date(2014, 8, 25))
 * //=> true
 */
export function isSameYear<T extends DateLike>(a: T, b: T): boolean;
export function isSameYear(a: Date | DateLike, b: Date | DateLike): boolean {
  return isSameYearValue(a, b);
}
