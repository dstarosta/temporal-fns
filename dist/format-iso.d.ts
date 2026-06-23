import { DateLike } from "./types.js";

//#region src/format-iso.d.ts
/**
 * The {@link formatISO} function options.
 */
interface FormatISOOptions {
  format?: 'extended' | 'basic';
  representation?: 'complete' | 'date' | 'time';
}
/**
 * @summary Format the date according to the ISO 8601 standard.
 *
 * @description
 * Return the formatted date string in ISO 8601 format. Options may be passed to control the
 * parts and notations of the date.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The formatted date string (in local time zone)
 *
 * @example
 * // Represent 18 September 2019 in ISO 8601 format (local time zone is UTC):
 * const result = formatISO(new Date(2019, 8, 18, 19, 0, 52))
 * //=> '2019-09-18T19:00:52Z'
 *
 * @example
 * // Represent 18 September 2019 in ISO 8601, short format (local time zone is UTC):
 * const result = formatISO(new Date(2019, 8, 18, 19, 0, 52), { format: 'basic' })
 * //=> '20190918T190052'
 *
 * @example
 * // Represent 18 September 2019 in ISO 8601 format, date only:
 * const result = formatISO(new Date(2019, 8, 18, 19, 0, 52), { representation: 'date' })
 * //=> '2019-09-18'
 *
 * @example
 * // Represent 18 September 2019 in ISO 8601 format, time only (local time zone is UTC):
 * const result = formatISO(new Date(2019, 8, 18, 19, 0, 52), { representation: 'time' })
 * //=> '19:00:52Z'
 */
declare function formatISO(date: Date | DateLike, options?: FormatISOOptions): string;
//#endregion
export { FormatISOOptions, formatISO };
//# sourceMappingURL=format-iso.d.ts.map