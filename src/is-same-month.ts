import { assertSameType } from './helpers/assert-same-type.js';
import { type DateLike } from './types.js';

/**
 * @summary Are the given dates in the same month (and year)?
 *
 * @description
 * Are the given dates in the same month (and year)?
 *
 * Untyped variant of {@link isSameMonth} that accepts the `Date | DateLike` union directly,
 * without the overloaded type narrowing.
 *
 * @param a - The first date to check
 * @param b - The second date to check
 *
 * @returns The dates are in the same month (and year)
 */
export function isSameMonthValue(a: Date | DateLike, b: Date | DateLike): boolean {
  if (a instanceof Date && b instanceof Date) {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
  }
  assertSameType(a as DateLike, b as DateLike);
  return (
    (a as DateLike).year === (b as DateLike).year && (a as DateLike).month === (b as DateLike).month
  );
}

/**
 * @summary Are the given dates in the same month (and year)?
 *
 * @description
 * Are the given dates in the same month (and year)?
 *
 * @param a - The first date to check
 * @param b - The second date to check
 *
 * @returns The dates are in the same month (and year)
 *
 * @example
 * // Are 2 September 2014 and 25 September 2014 in the same month?
 * const result = isSameMonth(new Date(2014, 8, 2), new Date(2014, 8, 25))
 * //=> true
 *
 * @example
 * // Are 2 September 2014 and 25 September 2015 in the same month?
 * const result = isSameMonth(new Date(2014, 8, 2), new Date(2015, 8, 25))
 * //=> false
 */
export function isSameMonth(a: Date, b: Date): boolean;
/**
 * @summary Are the given dates in the same month (and year)?
 *
 * @description
 * Are the given dates in the same month (and year)?
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `a`/`b`, which must share the same concrete type.
 *
 * @param a - The first date to check
 * @param b - The second date to check
 *
 * @returns The dates are in the same month (and year)
 *
 * @example
 * // Are 2 September 2014 and 25 September 2014 in the same month?
 * const result = isSameMonth(new Date(2014, 8, 2), new Date(2014, 8, 25))
 * //=> true
 *
 * @example
 * // Are 2 September 2014 and 25 September 2015 in the same month?
 * const result = isSameMonth(new Date(2014, 8, 2), new Date(2015, 8, 25))
 * //=> false
 */
export function isSameMonth<T extends DateLike>(a: T, b: T): boolean;
export function isSameMonth(a: Date | DateLike, b: Date | DateLike): boolean {
  return isSameMonthValue(a, b);
}
