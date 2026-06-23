import { TimeLike } from "./types.js";

//#region src/add-seconds.d.ts
/**
 * @summary Add the specified number of seconds to the given date.
 *
 * @description
 * Add the specified number of seconds to the given date.
 *
 * @typeParam T - A `TimeLike` type (`Temporal.PlainDateTime` or `Temporal.ZonedDateTime`).
 * Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param amount - The amount of seconds to be added.
 *
 * @returns The new date with the seconds added
 *
 * @example
 * // Add 30 seconds to 10 July 2014 12:45:00:
 * const result = addSeconds(new Date(2014, 6, 10, 12, 45, 0), 30)
 * //=> Thu Jul 10 2014 12:45:30
 */
declare const addSeconds: {
  (date: Date, amount: number): Date;
  <T extends TimeLike>(date: T, amount: number): T;
};
//#endregion
export { addSeconds };
//# sourceMappingURL=add-seconds.d.ts.map