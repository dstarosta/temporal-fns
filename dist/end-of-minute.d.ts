import { TimeLike } from "./types.js";

//#region src/end-of-minute.d.ts
/**
 * @summary Return the end of a minute for the given date.
 *
 * @description
 * Return the end of a minute for the given date.
 *
 * @param date - The original date
 *
 * @returns The end of a minute
 *
 * @example
 * // The end of a minute for 1 December 2014 22:15:45.400:
 * const result = endOfMinute(new Date(2014, 11, 1, 22, 15, 45, 400))
 * //=> Mon Dec 01 2014 22:15:59.999
 */
declare function endOfMinute(date: Date): Date;
/**
 * @summary Return the end of a minute for the given date.
 *
 * @description
 * Return the end of a minute for the given date.
 *
 * @typeParam T - A {@link TimeLike} type (`Temporal.PlainDateTime` or `Temporal.ZonedDateTime`).
 * Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The original date
 *
 * @returns The end of a minute
 *
 * @example
 * // The end of a minute for 1 December 2014 22:15:45.400:
 * const result = endOfMinute(new Date(2014, 11, 1, 22, 15, 45, 400))
 * //=> Mon Dec 01 2014 22:15:59.999
 */
declare function endOfMinute<T extends TimeLike>(date: T): T;
//#endregion
export { endOfMinute };
//# sourceMappingURL=end-of-minute.d.ts.map