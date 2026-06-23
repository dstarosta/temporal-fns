import { isValid } from './is-valid.js';
import { parse, type ParseOptions } from './parse.js';

/**
 * The {@link isMatch} function options.
 */
export type IsMatchOptions = ParseOptions;

/**
 * @summary Validate the date string against the given format string.
 *
 * @description
 * Return true if the given date string matches the given format string, false otherwise.
 *
 * The characters in the format string wrapped between two single quotes (') are escaped. Two
 * single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single
 * quote.
 *
 * Format of the format string is based on Unicode Technical Standard #35:
 * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 *
 * Not all tokens are compatible. Combinations that don't make sense or could lead to bugs are
 * prohibited and throw a `RangeError`. For example, using a 24-hour format token with an AM/PM
 * token throws:
 *
 * ```javascript
 * isMatch('23 AM', 'HH a')
 * //=> RangeError: The format string mustn't contain `HH` and `a` at the same time
 * ```
 *
 * Values are checked in the descending order of their unit's priority. Units of an equal priority
 * overwrite each other in the order of appearance.
 *
 * If no values of higher priority are matched (e.g. when matching the string 'January 1st'
 * without a year), the values are taken from the current date (`new Date()`), which works as the
 * context for matching.
 *
 * @param dateStr - The date string to verify
 * @param formatStr - The string of tokens
 * @param options - An object with options
 *
 * @returns Is the format string a match for the date string?
 *
 * @throws Format string contains an unescaped latin alphabet character
 * @throws The format string mustn't contain two incompatible tokens (e.g. `HH` and `a`) at the
 *   same time
 *
 * @example
 * // Match 11 February 2014 from middle-endian format:
 * const result = isMatch('02/11/2014', 'MM/dd/yyyy')
 * //=> true
 */
export function isMatch(dateStr: string, formatStr: string, options?: IsMatchOptions): boolean {
  return isValid(parse(dateStr, formatStr, new Date(), options));
}
