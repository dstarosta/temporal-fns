//#region src/to-date.d.ts
/**
 * The {@link toDate} function options.
 */
interface ToDateOptions {
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
declare function toDate(argument: unknown, options?: ToDateOptions): Date;
//#endregion
export { toDate };
//# sourceMappingURL=to-date.d.ts.map