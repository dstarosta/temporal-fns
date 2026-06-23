import { TimeLike } from "./types.js";

//#region src/add-hours.d.ts
/**
 * @summary Add the specified number of hours to the given date.
 *
 * @description
 * Add the specified number of hours to the given date.
 *
 * @typeParam T - A `TimeLike` type (`Temporal.PlainDateTime` or `Temporal.ZonedDateTime`).
 * Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param amount - The amount of hours to be added
 *
 * @returns The new date with the hours added
 *
 * @example
 * // Add 2 hours to 10 July 2014 23:00:00:
 * const result = addHours(new Date(2014, 6, 10, 23, 0), 2)
 * //=> Fri Jul 11 2014 01:00:00
 */
declare const addHours: {
  (date: Date, amount: number): Date;
  <T extends TimeLike>(date: T, amount: number): T;
};
//#endregion
export { addHours };
//# sourceMappingURL=add-hours.d.ts.map