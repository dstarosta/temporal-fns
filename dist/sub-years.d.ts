import { DateLike } from "./types.js";

//#region src/sub-years.d.ts
/**
 * @summary Subtract the specified number of years from the given date.
 *
 * @description
 * Subtract the specified number of years from the given date.
 *
 * @typeParam T - A `DateLike` type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param amount - The amount of years to be subtracted.
 *
 * @returns The new date with the years subtracted
 *
 * @example
 * // Subtract 5 years from 1 September 2014:
 * const result = subYears(new Date(2014, 8, 1), 5)
 * //=> Tue Sep 01 2009 00:00:00
 */
declare const subYears: {
  (date: Date, amount: number): Date;
  <T extends DateLike>(date: T, amount: number): T;
};
//#endregion
export { subYears };
//# sourceMappingURL=sub-years.d.ts.map