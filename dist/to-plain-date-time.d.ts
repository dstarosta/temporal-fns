import { DateLike } from "./types.js";

//#region src/to-plain-date-time.d.ts
/**
 * @summary Convert the given value to a `Temporal.PlainDateTime`.
 *
 * @description
 * Convert the given value to a `Temporal.PlainDateTime`, dropping any timezone information it
 * carries. Per the UTC rule, a `Date`'s fields are read as UTC; a `Temporal.ZonedDateTime`'s
 * fields in its own timezone are used; a `Temporal.PlainDate` gets a midnight time-of-day.
 *
 * @param value - The value to convert
 *
 * @returns The value's date and time, with no timezone
 */
declare function toPlainDateTime(value: Date | DateLike): Temporal.PlainDateTime;
//#endregion
export { toPlainDateTime };
//# sourceMappingURL=to-plain-date-time.d.ts.map