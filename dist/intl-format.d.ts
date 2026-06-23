import { DateLike } from "./types.js";

//#region src/intl-format.d.ts
/**
 * The {@link intlFormat} function locale options.
 */
interface IntlFormatLocaleOptions {
  locale: Intl.LocalesArgument;
}
/**
 * @summary Format the date with `Intl.DateTimeFormat`.
 *
 * @description
 * Return the formatted date string in the given format.
 * The method uses [`Intl.DateTimeFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat) inside.
 * formatOptions are the same as [`Intl.DateTimeFormat` options](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat#using_options).
 *
 * @param date - The date to format
 *
 * @returns The formatted date string
 *
 * @example
 * // Represent 4 October 2019 in middle-endian format:
 * const result = intlFormat(new Date(2019, 9, 4, 12, 30, 13, 456))
 * //=> 10/4/2019
 */
declare function intlFormat(date: Date | DateLike): string;
declare function intlFormat(date: Date | DateLike, localeOptions: IntlFormatLocaleOptions): string;
declare function intlFormat(date: Date | DateLike, formatOptions: Intl.DateTimeFormatOptions): string;
declare function intlFormat(date: Date | DateLike, formatOptions: Intl.DateTimeFormatOptions, localeOptions: IntlFormatLocaleOptions): string;
//#endregion
export { IntlFormatLocaleOptions, intlFormat };
//# sourceMappingURL=intl-format.d.ts.map