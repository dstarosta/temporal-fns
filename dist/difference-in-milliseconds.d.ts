import { TimeLike } from "./types.js";

//#region src/difference-in-milliseconds.d.ts
/**
 * @summary Get the number of milliseconds between the given dates.
 *
 * @description
 * Get the number of milliseconds between the given dates.
 *
 * @typeParam T - A `TimeLike` type (`Temporal.PlainDateTime` or `Temporal.ZonedDateTime`).
 * Inferred from `a`/`b`; both arguments must share the same concrete type.
 *
 * @param a - The later date
 * @param b - The earlier date
 *
 * @returns The number of milliseconds
 *
 * @example
 * // How many milliseconds are between
 * // 2 July 2014 12:30:20.600 and 2 July 2014 12:30:21.700?
 * const result = differenceInMilliseconds(
 *   new Date(2014, 6, 2, 12, 30, 21, 700),
 *   new Date(2014, 6, 2, 12, 30, 20, 600)
 * )
 * //=> 1100
 */
declare const differenceInMilliseconds: {
  (a: Date, b: Date): number;
  <T extends TimeLike>(a: T, b: T): number;
};
//#endregion
export { differenceInMilliseconds };
//# sourceMappingURL=difference-in-milliseconds.d.ts.map