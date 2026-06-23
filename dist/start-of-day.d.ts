import { TimeLike } from "./types.js";

//#region src/start-of-day.d.ts
/**
 * @summary Return the start of a day for the given date.
 *
 * @description
 * Return the start of a day for the given date.
 *
 * @param date - The original date
 *
 * @returns The start of a day
 *
 * @example
 * // The start of a day for 2 September 2014 11:55:00:
 * const result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 00:00:00
 */
declare function startOfDay(date: Date): Date;
/**
 * @summary Return the start of a day for the given date.
 *
 * @description
 * Return the start of a day for the given date.
 *
 * @typeParam T - A {@link TimeLike} type (`Temporal.PlainDateTime` or `Temporal.ZonedDateTime`).
 * Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The original date
 *
 * @returns The start of a day
 *
 * @example
 * // The start of a day for 2 September 2014 11:55:00:
 * const result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 00:00:00
 */
declare function startOfDay<T extends TimeLike>(date: T): T;
//#endregion
export { startOfDay };
//# sourceMappingURL=start-of-day.d.ts.map