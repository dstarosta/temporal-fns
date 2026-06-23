import { isDate } from './is-date.js';
import { toDate } from './to-date.js';
import { type DateLike } from './types.js';

/**
 * @summary Is the given date valid?
 *
 * @description
 * Always returns `true`: `Temporal.PlainDate`/`Temporal.PlainDateTime`/`Temporal.ZonedDateTime`
 * values can never represent an "Invalid Date" sentinel the way `Date` can — constructing one
 * from invalid input throws instead. This overload exists purely for API symmetry with the
 * general overload below.
 *
 * @param date - The date to check
 *
 * @returns `true`
 */
export function isValid(date: DateLike): true;
/**
 * @summary Is the given date valid?
 *
 * @description
 * Returns false if argument is Invalid Date and true otherwise. Argument is converted to `Date`
 * using {@link toDate}. Invalid Date is a `Date`, whose time value is `NaN`.
 *
 * @param date - The date to check
 *
 * @returns The date is valid
 *
 * @example
 * // For the valid date:
 * const result = isValid(new Date(2014, 1, 31))
 * //=> true
 *
 * @example
 * // For the value, convertible into a date:
 * const result = isValid(1393804800000)
 * //=> true
 *
 * @example
 * // For the invalid date:
 * const result = isValid(new Date(''))
 * //=> false
 */
export function isValid(date: unknown): boolean;
export function isValid(date: unknown): boolean {
  if (
    date instanceof Temporal.PlainDate ||
    date instanceof Temporal.PlainDateTime ||
    date instanceof Temporal.ZonedDateTime
  ) {
    return true;
  }
  return !((!isDate(date) && typeof date !== 'number') || Number.isNaN(+toDate(date)));
}
