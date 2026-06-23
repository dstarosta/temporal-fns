import { DateLike } from "./types.js";

//#region src/to-plain-date.d.ts
/**
 * @summary Convert the given value to a `Temporal.PlainDate`.
 *
 * @description
 * Convert the given value to a `Temporal.PlainDate`, dropping any time-of-day/timezone
 * information it carries. Per the UTC rule, a `Date`'s local calendar date is used; a
 * `Temporal.ZonedDateTime`'s calendar date in its own timezone is used.
 *
 * @param value - The value to convert
 *
 * @returns The value's calendar date
 */
declare function toPlainDate(value: Date | DateLike): Temporal.PlainDate;
//#endregion
export { toPlainDate };
//# sourceMappingURL=to-plain-date.d.ts.map