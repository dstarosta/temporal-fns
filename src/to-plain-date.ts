import { toPlainDate as toPlainDateValue } from './helpers/plain-date-result.js';
import { type DateLike } from './types.js';

/**
 * @summary Convert the given value to a `Temporal.PlainDate`.
 *
 * @description
 * Convert the given value to a `Temporal.PlainDate`, dropping any time-of-day/timezone
 * information it carries. Per the UTC rule, a `Date`'s local calendar date is used; a
 * `Temporal.ZonedDateTime`'s calendar date in its own timezone is used.
 *
 * @param value - The value to convert
 *
 * @returns The value's calendar date
 */
export function toPlainDate(value: Date | DateLike): Temporal.PlainDate {
  return toPlainDateValue(value);
}
