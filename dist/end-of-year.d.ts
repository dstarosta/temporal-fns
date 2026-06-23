import { DateLike } from "./types.js";

//#region src/end-of-year.d.ts
/**
 * @summary Return the end of a year for the given date.
 *
 * @description
 * Return the end of a year for the given date.
 *
 * @param date - The original date
 *
 * @returns The end of a year
 *
 * @example
 * // The end of a year for 2 September 2014 11:55:00:
 * const result = endOfYear(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Wed Dec 31 2014 23:59:59.999
 */
declare function endOfYear(date: Date): Date;
/**
 * @summary Return the end of a year for the given date.
 *
 * @description
 * Return the end of a year for the given date.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The original date
 *
 * @returns The end of a year
 *
 * @example
 * // The end of a year for 2 September 2014 11:55:00:
 * const result = endOfYear(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Wed Dec 31 2014 23:59:59.999
 */
declare function endOfYear<T extends DateLike>(date: T): T;
//#endregion
export { endOfYear };
//# sourceMappingURL=end-of-year.d.ts.map