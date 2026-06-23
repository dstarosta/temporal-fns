import { isPlainDate } from './is-plain-date.js';
import { isPlainDateTime } from './is-plain-date-time.js';
import { isZonedDateTime } from './is-zoned-date-time.js';
import { type DateLike } from './types.js';

/**
 * @summary Is the given value a Temporal date-like value?
 *
 * @description
 * Is the given value a {@link DateLike} (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`)?
 *
 * @param value - The value to check
 *
 * @returns True if the given value is a `Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`
 */
export function isTemporal(value: unknown): value is DateLike {
  return isPlainDate(value) || isPlainDateTime(value) || isZonedDateTime(value);
}
