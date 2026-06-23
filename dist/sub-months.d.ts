import { DateLike } from "./types.js";

//#region src/sub-months.d.ts
/**
 * @summary Subtract the specified number of months from the given date.
 *
 * @description
 * Subtract the specified number of months from the given date.
 *
 * @typeParam T - A `DateLike` type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param amount - The amount of months to be subtracted.
 *
 * @returns The new date with the months subtracted
 *
 * @example
 * // Subtract 5 months from 1 February 2015:
 * const result = subMonths(new Date(2015, 1, 1), 5)
 * //=> Mon Sep 01 2014 00:00:00
 */
declare const subMonths: {
  (date: Date, amount: number): Date;
  <T extends DateLike>(date: T, amount: number): T;
};
//#endregion
export { subMonths };
//# sourceMappingURL=sub-months.d.ts.map