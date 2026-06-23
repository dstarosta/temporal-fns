import { TimeLike } from "./types.js";

//#region src/difference-in-seconds.d.ts
/**
 * @summary Get the number of seconds between the given dates.
 *
 * @description
 * Get the number of seconds between the given dates.
 *
 * @typeParam T - A `TimeLike` type (`Temporal.PlainDateTime` or `Temporal.ZonedDateTime`).
 * Inferred from `a`/`b`; both arguments must share the same concrete type.
 *
 * @param a - The later date
 * @param b - The earlier date
 *
 * @returns The number of seconds
 *
 * @example
 * // How many seconds are between
 * // 2 July 2014 12:30:07.999 and 2 July 2014 12:30:20.000?
 * const result = differenceInSeconds(
 *   new Date(2014, 6, 2, 12, 30, 20, 0),
 *   new Date(2014, 6, 2, 12, 30, 7, 999)
 * )
 * //=> 12
 */
declare const differenceInSeconds: {
  (a: Date, b: Date): number;
  <T extends TimeLike>(a: T, b: T): number;
};
//#endregion
export { differenceInSeconds };
//# sourceMappingURL=difference-in-seconds.d.ts.map