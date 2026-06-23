import { DateLike } from "./types.js";

//#region src/format-iso9075.d.ts
/**
 * The {@link formatISO9075} function options.
 */
interface FormatISO9075Options {
  format?: 'extended' | 'basic';
  representation?: 'complete' | 'date' | 'time';
}
/**
 * @summary Format the date according to the ISO 9075 standard.
 *
 * @description
 * Return the formatted date string in ISO 9075 format. Options may be passed to control the
 * parts and notations of the date.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The formatted date string
 *
 * @example
 * // Represent 18 September 2019 in ISO 9075 format:
 * const result = formatISO9075(new Date(2019, 8, 18, 19, 0, 52))
 * //=> '2019-09-18 19:00:52'
 *
 * @example
 * // Represent 18 September 2019 in ISO 9075, short format:
 * const result = formatISO9075(new Date(2019, 8, 18, 19, 0, 52), { format: 'basic' })
 * //=> '20190918 190052'
 *
 * @example
 * // Represent 18 September 2019 in ISO 9075 format, date only:
 * const result = formatISO9075(new Date(2019, 8, 18, 19, 0, 52), { representation: 'date' })
 * //=> '2019-09-18'
 *
 * @example
 * // Represent 18 September 2019 in ISO 9075 format, time only:
 * const result = formatISO9075(new Date(2019, 8, 18, 19, 0, 52), { representation: 'time' })
 * //=> '19:00:52'
 */
declare function formatISO9075(date: Date | DateLike, options?: FormatISO9075Options): string;
//#endregion
export { FormatISO9075Options, formatISO9075 };
//# sourceMappingURL=format-iso9075.d.ts.map