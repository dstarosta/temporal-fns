import { DateLike } from "./types.js";

//#region src/sub-days.d.ts
/**
 * @summary Subtract the specified number of days from the given date.
 *
 * @description
 * Subtract the specified number of days from the given date.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param amount - The amount of days to be subtracted.
 *
 * @returns The new date with the days subtracted
 *
 * @example
 * // Subtract 10 days from 1 September 2014:
 * const result = subDays(new Date(2014, 8, 1), 10)
 * //=> Fri Aug 22 2014 00:00:00
 */
declare const subDays: {
  (date: Date, amount: number): Date;
  <T extends DateLike>(date: T, amount: number): T;
};
//#endregion
export { subDays };
//# sourceMappingURL=sub-days.d.ts.map