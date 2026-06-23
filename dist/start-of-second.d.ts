import { TimeLike } from "./types.js";

//#region src/start-of-second.d.ts
/**
 * @summary Return the start of a second for the given date.
 *
 * @description
 * Return the start of a second for the given date.
 *
 * @param date - The original date
 *
 * @returns The start of a second
 *
 * @example
 * // The start of a second for 1 December 2014 22:15:45.400:
 * const result = startOfSecond(new Date(2014, 11, 1, 22, 15, 45, 400))
 * //=> Mon Dec 01 2014 22:15:45.000
 */
declare function startOfSecond(date: Date): Date;
/**
 * @summary Return the start of a second for the given date.
 *
 * @description
 * Return the start of a second for the given date.
 *
 * @typeParam T - A {@link TimeLike} type (`Temporal.PlainDateTime` or `Temporal.ZonedDateTime`).
 * Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The original date
 *
 * @returns The start of a second
 *
 * @example
 * // The start of a second for 1 December 2014 22:15:45.400:
 * const result = startOfSecond(new Date(2014, 11, 1, 22, 15, 45, 400))
 * //=> Mon Dec 01 2014 22:15:45.000
 */
declare function startOfSecond<T extends TimeLike>(date: T): T;
//#endregion
export { startOfSecond };
//# sourceMappingURL=start-of-second.d.ts.map