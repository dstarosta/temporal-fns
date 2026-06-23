import { DateLike } from "./types.js";

//#region src/is-valid.d.ts
/**
 * @summary Is the given date valid?
 *
 * @description
 * Returns false if argument is Invalid Date and true otherwise. Argument is converted to `Date`
 * using {@link toDate}. Invalid Date is a `Date`, whose time value is `NaN`.
 *
 * `Temporal.PlainDate`/`Temporal.PlainDateTime`/`Temporal.ZonedDateTime` values always return
 * `true`, since Temporal has no "Invalid Date" sentinel — constructing one from invalid input
 * throws instead.
 *
 * @param date - The date to check
 *
 * @returns The date is valid
 *
 * @example
 * // For the valid date:
 * const result = isValid(new Date(2014, 1, 31))
 * //=> true
 *
 * @example
 * // For the value, convertible into a date:
 * const result = isValid(1393804800000)
 * //=> true
 *
 * @example
 * // For the invalid date:
 * const result = isValid(new Date(''))
 * //=> false
 */
declare function isValid(date: unknown): boolean;
declare function isValid(date: DateLike): true;
//#endregion
export { isValid };
//# sourceMappingURL=is-valid.d.ts.map