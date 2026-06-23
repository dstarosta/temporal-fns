import { TimeLike } from "./types.js";

//#region src/add-milliseconds.d.ts
/**
 * @summary Add the specified number of milliseconds to the given date.
 *
 * @description
 * Add the specified number of milliseconds to the given date.
 *
 * @typeParam T - A `TimeLike` type (`Temporal.PlainDateTime` or `Temporal.ZonedDateTime`).
 * Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param amount - The amount of milliseconds to be added.
 *
 * @returns The new date with the milliseconds added
 *
 * @example
 * // Add 750 milliseconds to 10 July 2014 12:45:30.000:
 * const result = addMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
 * //=> Thu Jul 10 2014 12:45:30.750
 */
declare const addMilliseconds: {
  (date: Date, amount: number): Date;
  <T extends TimeLike>(date: T, amount: number): T;
};
//#endregion
export { addMilliseconds };
//# sourceMappingURL=add-milliseconds.d.ts.map