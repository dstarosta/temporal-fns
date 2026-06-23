import { compare } from './helpers/compare.js';
import { type DateLike } from './types.js';

/**
 * @summary Return the latest of the given dates.
 *
 * @description
 * Return the latest of the given dates.
 *
 * Untyped variant of {@link max} that accepts and returns the `Date | DateLike` union directly,
 * without the overloaded type narrowing.
 *
 * @param dates - The dates to compare
 *
 * @returns The latest of the dates
 *
 * @throws `RangeError` when `dates` is empty.
 */
export function maxValue(dates: readonly (Date | DateLike)[]): Date | DateLike {
  const [first, ...rest] = dates;
  if (first === undefined) {
    throw new RangeError('max() requires a non-empty array.');
  }

  let result = first;
  for (const date of rest) {
    if (compare(date, result) > 0) {
      result = date;
    }
  }
  return result;
}

/**
 * @summary Return the latest of the given dates.
 *
 * @description
 * Return the latest of the given dates.
 *
 * @param dates - The dates to compare
 *
 * @returns The latest of the dates
 *
 * @throws `RangeError` when `dates` is empty.
 *
 * @example
 * // Which of these dates is the latest?
 * const result = max([
 *   new Date(1989, 6, 10),
 *   new Date(1987, 1, 11),
 *   new Date(1995, 6, 2),
 *   new Date(1990, 0, 1)
 * ])
 * //=> Sun Jul 02 1995 00:00:00
 */
export function max(dates: readonly Date[]): Date;
/**
 * @summary Return the latest of the given dates.
 *
 * @description
 * Return the latest of the given dates.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `dates`; the result has the same concrete type.
 *
 * @param dates - The dates to compare
 *
 * @returns The latest of the dates
 *
 * @throws `RangeError` when `dates` is empty.
 *
 * @example
 * // Which of these dates is the latest?
 * const result = max([
 *   new Date(1989, 6, 10),
 *   new Date(1987, 1, 11),
 *   new Date(1995, 6, 2),
 *   new Date(1990, 0, 1)
 * ])
 * //=> Sun Jul 02 1995 00:00:00
 */
export function max<T extends DateLike>(dates: readonly T[]): T;
export function max(dates: readonly (Date | DateLike)[]): Date | DateLike {
  return maxValue(dates);
}
