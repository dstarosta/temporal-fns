import { DateLike } from "./types.js";

//#region src/sub-weeks.d.ts
/**
 * @summary Subtract the specified number of weeks from the given date.
 *
 * @description
 * Subtract the specified number of weeks from the given date.
 *
 * @typeParam T - A `DateLike` type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param amount - The amount of weeks to be subtracted.
 *
 * @returns The new date with the weeks subtracted
 *
 * @example
 * // Subtract 4 weeks from 1 September 2014:
 * const result = subWeeks(new Date(2014, 8, 1), 4)
 * //=> Mon Aug 04 2014 00:00:00
 */
declare const subWeeks: {
  (date: Date, amount: number): Date;
  <T extends DateLike>(date: T, amount: number): T;
};
//#endregion
export { subWeeks };
//# sourceMappingURL=sub-weeks.d.ts.map