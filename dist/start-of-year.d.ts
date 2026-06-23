import { DateLike } from "./types.js";

//#region src/start-of-year.d.ts
/**
 * @summary Return the start of a year for the given date.
 *
 * @description
 * Return the start of a year for the given date.
 *
 * @param date - The original date
 *
 * @returns The start of a year
 *
 * @example
 * // The start of a year for 2 September 2014 11:55:00:
 * const result = startOfYear(new Date(2014, 8, 2, 11, 55, 00))
 * //=> Wed Jan 01 2014 00:00:00
 */
declare function startOfYear(date: Date): Date;
/**
 * @summary Return the start of a year for the given date.
 *
 * @description
 * Return the start of a year for the given date.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The original date
 *
 * @returns The start of a year
 *
 * @example
 * // The start of a year for 2 September 2014 11:55:00:
 * const result = startOfYear(new Date(2014, 8, 2, 11, 55, 00))
 * //=> Wed Jan 01 2014 00:00:00
 */
declare function startOfYear<T extends DateLike>(date: T): T;
//#endregion
export { startOfYear };
//# sourceMappingURL=start-of-year.d.ts.map