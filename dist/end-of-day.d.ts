import { TimeLike } from "./types.js";

//#region src/end-of-day.d.ts
/**
 * @summary Return the end of a day for the given date.
 *
 * @description
 * Return the end of a day for the given date.
 *
 * @param date - The original date
 *
 * @returns The end of a day
 *
 * @example
 * // The end of a day for 2 September 2014 11:55:00:
 * const result = endOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 23:59:59.999
 */
declare function endOfDay(date: Date): Date;
/**
 * @summary Return the end of a day for the given date.
 *
 * @description
 * Return the end of a day for the given date.
 *
 * @typeParam T - A {@link TimeLike} type (`Temporal.PlainDateTime` or `Temporal.ZonedDateTime`).
 * Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The original date
 *
 * @returns The end of a day
 *
 * @example
 * // The end of a day for 2 September 2014 11:55:00:
 * const result = endOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 23:59:59.999
 */
declare function endOfDay<T extends TimeLike>(date: T): T;
//#endregion
export { endOfDay };
//# sourceMappingURL=end-of-day.d.ts.map