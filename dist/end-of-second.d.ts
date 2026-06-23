import { TimeLike } from "./types.js";

//#region src/end-of-second.d.ts
/**
 * @summary Return the end of a second for the given date.
 *
 * @description
 * Return the end of a second for the given date.
 *
 * @param date - The original date
 *
 * @returns The end of a second
 *
 * @example
 * // The end of a second for 1 December 2014 22:15:45.400:
 * const result = endOfSecond(new Date(2014, 11, 1, 22, 15, 45, 400))
 * //=> Mon Dec 01 2014 22:15:45.999
 */
declare function endOfSecond(date: Date): Date;
/**
 * @summary Return the end of a second for the given date.
 *
 * @description
 * Return the end of a second for the given date.
 *
 * @typeParam T - A {@link TimeLike} type (`Temporal.PlainDateTime` or `Temporal.ZonedDateTime`).
 * Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The original date
 *
 * @returns The end of a second
 *
 * @example
 * // The end of a second for 1 December 2014 22:15:45.400:
 * const result = endOfSecond(new Date(2014, 11, 1, 22, 15, 45, 400))
 * //=> Mon Dec 01 2014 22:15:45.999
 */
declare function endOfSecond<T extends TimeLike>(date: T): T;
//#endregion
export { endOfSecond };
//# sourceMappingURL=end-of-second.d.ts.map