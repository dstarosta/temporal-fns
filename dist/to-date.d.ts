//#region src/to-date.d.ts
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
 * If the argument is a number or string, it is passed directly to the `Date` constructor (a
 * number is treated as a timestamp).
 *
 * If the argument is none of the above, the function returns an invalid `Date` (whose time
 * value is `NaN`).
 *
 * @param argument - The value to convert
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
 */
declare function toDate(argument: unknown): Date;
//#endregion
export { toDate };
//# sourceMappingURL=to-date.d.ts.map