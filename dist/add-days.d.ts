import { DateLike } from "./types.js";

//#region src/add-days.d.ts
/**
 * @summary Add the specified number of days to the given date.
 *
 * @description
 * Add the specified number of days to the given date.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param amount - The amount of days to be added.
 *
 * @returns The new date with the days added
 *
 * @example
 * // Add 10 days to 1 September 2014:
 * const result = addDays(new Date(2014, 8, 1), 10)
 * //=> Thu Sep 11 2014 00:00:00
 */
declare const addDays: {
  (date: Date, amount: number): Date;
  <T extends DateLike>(date: T, amount: number): T;
};
//#endregion
export { addDays };
//# sourceMappingURL=add-days.d.ts.map