import { compare } from './helpers/compare.js';
import { type DateLike } from './types.js';

/**
 * @summary Are the given dates equal?
 *
 * @description
 * Are the given dates equal?
 *
 * @param a - The first date to compare
 * @param b - The second date to compare
 *
 * @returns The dates are equal
 *
 * @example
 * // Are 2 July 2014 06:30:45.000 and 2 July 2014 06:30:45.500 equal?
 * const result = isEqual(
 *   new Date(2014, 6, 2, 6, 30, 45, 0),
 *   new Date(2014, 6, 2, 6, 30, 45, 500)
 * )
 * //=> false
 */
export function isEqual(a: Date, b: Date): boolean;
/**
 * @summary Are the given dates equal?
 *
 * @description
 * Are the given dates equal?
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `a`/`b`, which must share the same concrete type.
 *
 * @param a - The first date to compare
 * @param b - The second date to compare
 *
 * @returns The dates are equal
 *
 * @example
 * // Are 2 July 2014 06:30:45.000 and 2 July 2014 06:30:45.500 equal?
 * const result = isEqual(
 *   new Date(2014, 6, 2, 6, 30, 45, 0),
 *   new Date(2014, 6, 2, 6, 30, 45, 500)
 * )
 * //=> false
 */
export function isEqual<T extends DateLike>(a: T, b: T): boolean;
export function isEqual(a: Date | DateLike, b: Date | DateLike): boolean {
  return compare(a, b) === 0;
}
