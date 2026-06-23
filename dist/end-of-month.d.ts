import { DateLike } from "./types.js";

//#region src/end-of-month.d.ts
/**
 * @summary Return the end of a month for the given date.
 *
 * @description
 * Return the end of a month for the given date.
 *
 * @param date - The original date
 *
 * @returns The end of a month
 *
 * @example
 * // The end of a month for 2 September 2014 11:55:00:
 * const result = endOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 30 2014 23:59:59.999
 */
declare function endOfMonth(date: Date): Date;
/**
 * @summary Return the end of a month for the given date.
 *
 * @description
 * Return the end of a month for the given date.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The original date
 *
 * @returns The end of a month
 *
 * @example
 * // The end of a month for 2 September 2014 11:55:00:
 * const result = endOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 30 2014 23:59:59.999
 */
declare function endOfMonth<T extends DateLike>(date: T): T;
//#endregion
export { endOfMonth };
//# sourceMappingURL=end-of-month.d.ts.map