import { TimeLike } from "./types.js";

//#region src/difference-in-hours.d.ts
/**
 * @summary Get the number of hours between the given dates.
 *
 * @description
 * Get the number of hours between the given dates.
 *
 * @typeParam T - A `TimeLike` type (`Temporal.PlainDateTime` or `Temporal.ZonedDateTime`).
 * Inferred from `a`/`b`; both arguments must share the same concrete type.
 *
 * @param a - The later date
 * @param b - The earlier date
 *
 * @returns The number of hours
 *
 * @example
 * // How many hours are between 2 July 2014 06:50:00 and 2 July 2014 19:00:00?
 * const result = differenceInHours(
 *   new Date(2014, 6, 2, 19, 0),
 *   new Date(2014, 6, 2, 6, 50)
 * )
 * //=> 12
 */
declare const differenceInHours: {
  (a: Date, b: Date): number;
  <T extends TimeLike>(a: T, b: T): number;
};
//#endregion
export { differenceInHours };
//# sourceMappingURL=difference-in-hours.d.ts.map