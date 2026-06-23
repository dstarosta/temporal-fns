//#region src/parse-json.d.ts
interface ParseJSONTemporalOptions<T extends Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime> {
  in: new (...args: never[]) => T;
}
type ParseJSONZonedDateTimeOptions = ParseJSONTemporalOptions<Temporal.ZonedDateTime> & {
  timeZone: string;
};
/**
 * @summary Parse a JSON date string.
 *
 * @description
 * Parse a date string produced by `JSON.stringify(date)` — an ISO 8601 string with no `T`/`Z`
 * separator constraints relaxed enough to accept the format JavaScript's `Date#toJSON` produces
 * (e.g. `'2000-03-15T05:20:10.123Z'`), and treats a string with no offset as UTC, unlike
 * {@link parseISO} which treats a no-offset string as local wall-clock time.
 *
 * Without `options.in`, returns a `Date` (an invalid `Date`, whose time value is `NaN`, if the
 * string cannot be parsed). With `options.in` set to a Temporal class constructor, returns an
 * instance of that class, or `undefined` if the string cannot be parsed.
 *
 * @param argument - The value to convert
 *
 * @returns The parsed date
 *
 * @example
 * const result = parseJSON('2000-03-15T05:20:10.123Z')
 * //=> Wed Mar 15 2000 05:20:10.123
 */
declare function parseJSON(argument: string): Date;
declare function parseJSON(argument: string, options: ParseJSONTemporalOptions<Temporal.PlainDate>): Temporal.PlainDate | undefined;
declare function parseJSON(argument: string, options: ParseJSONTemporalOptions<Temporal.PlainDateTime>): Temporal.PlainDateTime | undefined;
declare function parseJSON(argument: string, options: ParseJSONZonedDateTimeOptions): Temporal.ZonedDateTime | undefined;
//#endregion
export { ParseJSONTemporalOptions, ParseJSONZonedDateTimeOptions, parseJSON };
//# sourceMappingURL=parse-json.d.ts.map