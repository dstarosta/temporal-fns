import { compare } from './helpers/compare.js';
import { type DateLike } from './types.js';

/**
 * @summary Is the first date before the second one?
 *
 * @description
 * Is the first date before the second one?
 *
 * @param a - The date that should be before the other one to return true
 * @param b - The date to compare with
 *
 * @returns The first date is before the second date
 *
 * @example
 * // Is 10 July 1989 before 11 February 1987?
 * const result = isBefore(new Date(1989, 6, 10), new Date(1987, 1, 11))
 * //=> false
 */
export function isBefore(a: Date, b: Date): boolean;
/**
 * @summary Is the first date before the second one?
 *
 * @description
 * Is the first date before the second one?
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `a`/`b`, which must share the same concrete type.
 *
 * @param a - The date that should be before the other one to return true
 * @param b - The date to compare with
 *
 * @returns The first date is before the second date
 *
 * @example
 * // Is 10 July 1989 before 11 February 1987?
 * const result = isBefore(new Date(1989, 6, 10), new Date(1987, 1, 11))
 * //=> false
 */
export function isBefore<T extends DateLike>(a: T, b: T): boolean;
export function isBefore(a: Date | DateLike, b: Date | DateLike): boolean {
  return compare(a, b) < 0;
}
