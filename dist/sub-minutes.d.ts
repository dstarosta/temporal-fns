import { TimeLike } from "./types.js";

//#region src/sub-minutes.d.ts
/**
 * @summary Subtract the specified number of minutes from the given date.
 *
 * @description
 * Subtract the specified number of minutes from the given date.
 *
 * @typeParam T - A `TimeLike` type (`Temporal.PlainDateTime` or `Temporal.ZonedDateTime`).
 * Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param amount - The amount of minutes to be subtracted.
 *
 * @returns The new date with the minutes subtracted
 *
 * @example
 * // Subtract 30 minutes from 10 July 2014 12:00:00:
 * const result = subMinutes(new Date(2014, 6, 10, 12, 0), 30)
 * //=> Thu Jul 10 2014 11:30:00
 */
declare const subMinutes: {
  (date: Date, amount: number): Date;
  <T extends TimeLike>(date: T, amount: number): T;
};
//#endregion
export { subMinutes };
//# sourceMappingURL=sub-minutes.d.ts.map