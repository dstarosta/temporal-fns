// Mirrors date-fns' toDate: clones a Date, converts a number/string via the
// Date constructor, and falls through to the constructor for anything else
// (which yields an Invalid Date rather than throwing, matching native Date
// behavior for unsupported input). When `options.timeZone` is given (matching
// date-fns-tz's `toDate` overload), string input is run through the same
// lenient ISO 8601 parser and timeZone resolution as `parseISOZonedDateTime`
// instead of the native Date constructor.

import { plainDateTimeToDate } from './helpers/convert.js';
import { parseISOZonedDateTime } from './parse-iso.js';

/**
 * The {@link toDate} function options.
 */
export interface ToDateOptions {
  /**
   * The IANA time zone identifier to resolve string input in, when the string has no offset of
   * its own. Matches `date-fns-tz`'s `toDate` `options.timeZone`.
   */
  timeZone?: string;
}

/**
 * @summary Convert the given argument to an instance of `Date`.
 *
 * @description
 * Convert the given argument to an instance of `Date`.
 *
 * If the argument is an instance of `Date`, the function returns its clone.
 *
 * If the argument is a `Temporal.PlainDate` or `Temporal.PlainDateTime`, its wall-clock fields
 * (with midnight assumed for `PlainDate`) are read as local time, matching this library's other
 * `Date`-producing conversions. If the argument is a `Temporal.ZonedDateTime`, the returned `Date`
 * represents the same instant (`argument.epochMilliseconds`), not its wall-clock fields
 * reinterpreted as local time.
 *
 * If the argument is a number, it is passed directly to the `Date` constructor (treated as a
 * timestamp).
 *
 * If the argument is a string and `options.timeZone` is not given, it is passed directly to the
 * `Date` constructor. If `options.timeZone` is given, the string is parsed as ISO 8601 (complete
 * or partial) and resolved as the local time in that time zone — unless the string itself
 * carries an offset, in which case the offset wins and `options.timeZone` is ignored, matching
 * `date-fns-tz`'s `toDate`.
 *
 * If the argument is none of the above, the function returns an invalid `Date` (whose time
 * value is `NaN`).
 *
 * @param argument - The value to convert
 * @param options - An object with options
 *
 * @returns The converted date
 *
 * @example
 * // Clone the date:
 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert the timestamp to date:
 * const result = toDate(1392098430000)
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Parse a string with no offset as local time in a time zone:
 * const result = toDate('2014-06-25T10:00:00', { timeZone: 'America/Los_Angeles' })
 * //=> 2014-06-25T17:00:00.000Z
 */
export function toDate(argument: unknown, options?: ToDateOptions): Date {
  if (argument instanceof Date) {
    return new Date(argument);
  } else if (argument instanceof Temporal.PlainDate) {
    return plainDateTimeToDate(argument.toPlainDateTime());
  } else if (argument instanceof Temporal.PlainDateTime) {
    return plainDateTimeToDate(argument);
  } else if (argument instanceof Temporal.ZonedDateTime) {
    return new Date(argument.epochMilliseconds);
  }

  if (typeof argument === 'string' && options?.timeZone) {
    const zonedDateTime = parseISOZonedDateTime(argument, { timeZone: options.timeZone });
    return zonedDateTime ? new Date(zonedDateTime.epochMilliseconds) : new Date(Number.NaN);
  }

  return new Date(argument as ConstructorParameters<typeof Date>[0]);
}
