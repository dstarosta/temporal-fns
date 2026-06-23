import { dateToPlainDateTime } from './helpers/convert.js';
import { type DateLike } from './types.js';

/**
 * @summary Convert the given value to a `Temporal.PlainDateTime`.
 *
 * @description
 * Convert the given value to a `Temporal.PlainDateTime`, dropping any timezone information it
 * carries. Per the UTC rule, a `Date`'s fields are read as UTC; a `Temporal.ZonedDateTime`'s
 * fields in its own timezone are used; a `Temporal.PlainDate` gets a midnight time-of-day.
 *
 * @param value - The value to convert
 *
 * @returns The value's date and time, with no timezone
 */
export function toPlainDateTime(value: Date | DateLike): Temporal.PlainDateTime {
  if (value instanceof Date) {
    return dateToPlainDateTime(value);
  }
  if (value instanceof Temporal.PlainDateTime) {
    return value;
  }
  if (value instanceof Temporal.PlainDate) {
    return value.toPlainDateTime();
  }
  return value.toPlainDateTime();
}
