import { DateLike } from "./types.js";

//#region src/start-of-month.d.ts
/**
 * @summary Return the start of a month for the given date.
 *
 * @description
 * Return the start of a month for the given date.
 *
 * @param date - The original date
 *
 * @returns The start of a month
 *
 * @example
 * // The start of a month for 2 September 2014 11:55:00:
 * const result = startOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Mon Sep 01 2014 00:00:00
 */
declare function startOfMonth(date: Date): Date;
/**
 * @summary Return the start of a month for the given date.
 *
 * @description
 * Return the start of a month for the given date.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The original date
 *
 * @returns The start of a month
 *
 * @example
 * // The start of a month for 2 September 2014 11:55:00:
 * const result = startOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Mon Sep 01 2014 00:00:00
 */
declare function startOfMonth<T extends DateLike>(date: T): T;
//#endregion
export { startOfMonth };
//# sourceMappingURL=start-of-month.d.ts.map