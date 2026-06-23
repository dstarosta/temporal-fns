//#region src/parse-iso.d.ts
/**
 * The {@link parseISO} function options.
 */
interface ParseISOOptions {
  additionalDigits?: 0 | 1 | 2;
}
interface ParseISOTemporalOptions<T extends Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime> extends ParseISOOptions {
  in: new (...args: never[]) => T;
}
type ParseISOZonedDateTimeOptions = ParseISOTemporalOptions<Temporal.ZonedDateTime> & {
  timeZone: string;
};
/**
 * @summary Parse ISO string.
 *
 * @description
 * Parse the given string in ISO 8601 format.
 *
 * Function accepts complete ISO 8601 formats as well as partial implementations.
 * ISO 8601: http://en.wikipedia.org/wiki/ISO_8601
 *
 * Without `options.in`, returns a `Date` in the local time zone (an invalid `Date`, whose time
 * value is `NaN`, if the string cannot be parsed). With `options.in` set to a Temporal class
 * constructor, returns an instance of that class, or `undefined` if the string cannot be parsed.
 *
 * @param string - The value to convert
 * @param options - An object with options
 *
 * @returns The parsed date
 *
 * @example
 * // Convert string '2014-02-11T11:30:30' to date:
 * const result = parseISO('2014-02-11T11:30:30')
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert string '+02014101' to date,
 * // if the additional number of digits in the extended year format is 1:
 * const result = parseISO('+02014101', { additionalDigits: 1 })
 * //=> Fri Apr 11 2014 00:00:00
 */
declare function parseISO(string: string, options?: ParseISOOptions): Date;
declare function parseISO(string: string, options: ParseISOTemporalOptions<Temporal.PlainDate>): Temporal.PlainDate | undefined;
declare function parseISO(string: string, options: ParseISOTemporalOptions<Temporal.PlainDateTime>): Temporal.PlainDateTime | undefined;
declare function parseISO(string: string, options: ParseISOZonedDateTimeOptions): Temporal.ZonedDateTime | undefined;
//#endregion
export { ParseISOOptions, ParseISOTemporalOptions, ParseISOZonedDateTimeOptions, parseISO };
//# sourceMappingURL=parse-iso.d.ts.map