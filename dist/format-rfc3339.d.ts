import { DateLike } from "./types.js";

//#region src/format-rfc3339.d.ts
/**
 * The {@link formatRFC3339} function options.
 */
interface FormatRFC3339Options {
  fractionDigits?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
}
/**
 * @summary Format the date according to the RFC 3339 standard.
 *
 * @description
 * Return the formatted date string in RFC 3339 format. Options may be passed to control the
 * parts and notations of the date.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The formatted date string
 *
 * @example
 * // Represent 18 September 2019 in RFC 3339 format:
 * formatRFC3339(new Date(2019, 8, 18, 19, 0, 52))
 * //=> '2019-09-18T19:00:52Z'
 *
 * @example
 * // Represent 18 September 2019 in RFC 3339 format, 3 digits of second fraction
 * formatRFC3339(new Date(2019, 8, 18, 19, 0, 52, 234), {
 *   fractionDigits: 3
 * })
 * //=> '2019-09-18T19:00:52.234Z'
 */
declare function formatRFC3339(date: Date | DateLike, options?: FormatRFC3339Options): string;
//#endregion
export { FormatRFC3339Options, formatRFC3339 };
//# sourceMappingURL=format-rfc3339.d.ts.map