import { DateLike } from "./types.js";

//#region src/format-rfc7231.d.ts
/**
 * @summary Format the date according to the RFC 7231 standard.
 *
 * @description
 * Return the formatted date string in RFC 7231 format.
 * The result will always be in UTC timezone.
 *
 * @param date - The original date
 *
 * @returns The formatted date string
 *
 * @throws `Invalid time value` if `date` is an invalid `Date`
 *
 * @example
 * // Represent 18 September 2019 in RFC 7231 format:
 * const result = formatRFC7231(new Date(2019, 8, 18, 19, 0, 52))
 * //=> 'Wed, 18 Sep 2019 19:00:52 GMT'
 */
declare function formatRFC7231(date: Date): string;
declare function formatRFC7231(date: DateLike): string;
//#endregion
export { formatRFC7231 };
//# sourceMappingURL=format-rfc7231.d.ts.map