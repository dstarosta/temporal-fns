import { isDate } from './is-date.js';
import { toDate } from './to-date.js';
import { type DateLike } from './types.js';

// Temporal values can never represent an "Invalid Date" sentinel the way
// JS Date can (Temporal.PlainDate.from('garbage') throws at construction
// time instead) — this overload exists purely for API symmetry and always
// returns true.
/**
 * @summary Is the given date valid?
 *
 * @description
 * Returns false if argument is Invalid Date and true otherwise. Argument is converted to `Date`
 * using {@link toDate}. Invalid Date is a `Date`, whose time value is `NaN`.
 *
 * `Temporal.PlainDate`/`Temporal.PlainDateTime`/`Temporal.ZonedDateTime` values always return
 * `true`, since Temporal has no "Invalid Date" sentinel — constructing one from invalid input
 * throws instead.
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
export function isValid(date: DateLike): true;
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
