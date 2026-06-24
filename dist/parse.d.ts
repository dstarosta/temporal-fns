import { DateLike } from "./types.js";

//#region src/parse.d.ts
/**
 * The {@link parse} function options.
 */
interface ParseOptions {
  locale?: Intl.LocalesArgument;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  firstWeekContainsDate?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  useAdditionalWeekYearTokens?: boolean;
  useAdditionalDayOfYearTokens?: boolean;
}
interface ParseTemporalOptions<T extends Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime> extends ParseOptions {
  in: new (...args: never[]) => T;
}
type ParseZonedDateTimeOptions = ParseTemporalOptions<Temporal.ZonedDateTime> & {
  timeZone: string;
};
/**
 * @summary Parse the date.
 *
 * @description
 * Return the date parsed from string using the given format string.
 *
 * The characters wrapped between two single quote characters (') are escaped.
 * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real'
 * single quote.
 *
 * Format of the string is based on Unicode Technical Standard #35:
 * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 *
 * Values will be assigned to the date in the descending order of priority: years, then months and
 * weeks, then days, then hours, minutes and seconds, then milliseconds. Units of an equal priority
 * overwrite each other in the order of appearance.
 *
 * If no values of higher priority are parsed (e.g. when parsing string 'January 1st' without a
 * year), the values will be taken from `referenceDate`, which works as a context of parsing.
 *
 * If `formatStr` matches with `dateStr` but doesn't provide tokens, `referenceDate` is returned
 * (with the time set to midnight).
 *
 * If parsing fails, an invalid `Date` (whose time value is `NaN`) is returned.
 *
 * @param dateStr - The string to parse
 * @param formatStr - The string of tokens
 * @param referenceDate - Defines values missing from the parsed `dateStr`
 * @param options - An object with options
 *
 * @returns The parsed date
 *
 * @throws Format string contains an unescaped latin alphabet character
 * @throws The format string mustn't contain two incompatible tokens (e.g. `HH` and `a`) at the
 *   same time
 *
 * @example
 * // Parse 11 February 2014 from middle-endian format:
 * const result = parse('02/11/2014', 'MM/dd/yyyy', new Date())
 * //=> Tue Feb 11 2014 00:00:00
 */
declare function parse(dateStr: string, formatStr: string, referenceDate: Date | DateLike, options?: ParseOptions): Date;
/**
 * @summary Parse the date.
 *
 * @description
 * Return the date parsed from string using the given format string, as a `Temporal.PlainDate`.
 *
 * Throws a `TypeError` if `formatStr` contains any time-of-day token (hour, minute, second,
 * fraction of a second, AM/PM, or day period), since a `Temporal.PlainDate` has no time
 * component.
 *
 * @typeParam T - `Temporal.PlainDate`. Selected via `options.in`.
 *
 * @param dateStr - The string to parse
 * @param formatStr - The string of tokens
 * @param referenceDate - Defines values missing from the parsed `dateStr`
 * @param options - An object with options, including `in: typeof Temporal.PlainDate`
 *
 * @returns The parsed date, or `undefined` if `dateStr` doesn't match `formatStr`
 *
 * @throws Format string contains an unescaped latin alphabet character
 * @throws The format string mustn't contain two incompatible tokens (e.g. `HH` and `a`) at the
 *   same time
 * @throws `formatStr` contains a time-of-day token
 */
declare function parse(dateStr: string, formatStr: string, referenceDate: Date | DateLike, options: ParseTemporalOptions<Temporal.PlainDate>): Temporal.PlainDate | undefined;
/**
 * @summary Parse the date.
 *
 * @description
 * Return the date parsed from string using the given format string, as a
 * `Temporal.PlainDateTime`.
 *
 * Any timezone offset or Unix timestamp token (`X`, `x`, `t`, `T`) parsed from `dateStr` is
 * discarded, since a `Temporal.PlainDateTime` has no time zone to apply it to.
 *
 * @typeParam T - `Temporal.PlainDateTime`. Selected via `options.in`.
 *
 * @param dateStr - The string to parse
 * @param formatStr - The string of tokens
 * @param referenceDate - Defines values missing from the parsed `dateStr`
 * @param options - An object with options, including `in: typeof Temporal.PlainDateTime`
 *
 * @returns The parsed date, or `undefined` if `dateStr` doesn't match `formatStr`
 *
 * @throws Format string contains an unescaped latin alphabet character
 * @throws The format string mustn't contain two incompatible tokens (e.g. `HH` and `a`) at the
 *   same time
 */
declare function parse(dateStr: string, formatStr: string, referenceDate: Date | DateLike, options: ParseTemporalOptions<Temporal.PlainDateTime>): Temporal.PlainDateTime | undefined;
/**
 * @summary Parse the date.
 *
 * @description
 * Return the date parsed from string using the given format string, as a
 * `Temporal.ZonedDateTime` in the given `options.timeZone`.
 *
 * If `dateStr` contains an explicit timezone offset or Unix timestamp token, the resulting
 * instant is authoritative and `options.timeZone` only determines its wall-clock representation.
 * Otherwise the parsed wall-clock fields are attached directly to `options.timeZone`.
 *
 * @typeParam T - `Temporal.ZonedDateTime`. Selected via `options.in`.
 *
 * @param dateStr - The string to parse
 * @param formatStr - The string of tokens
 * @param referenceDate - Defines values missing from the parsed `dateStr`
 * @param options - An object with options, including `in: typeof Temporal.ZonedDateTime` and a
 *   required `timeZone`
 *
 * @returns The parsed date, or `undefined` if `dateStr` doesn't match `formatStr`
 *
 * @throws Format string contains an unescaped latin alphabet character
 * @throws The format string mustn't contain two incompatible tokens (e.g. `HH` and `a`) at the
 *   same time
 */
declare function parse(dateStr: string, formatStr: string, referenceDate: Date | DateLike, options: ParseZonedDateTimeOptions): Temporal.ZonedDateTime | undefined;
//#endregion
export { ParseOptions, ParseTemporalOptions, ParseZonedDateTimeOptions, parse };
//# sourceMappingURL=parse.d.ts.map