import { DateLike } from "./types.js";

//#region src/end-of-iso-week-year.d.ts
/**
 * @summary Return the end of an ISO week-numbering year for the given date.
 *
 * @description
 * Return the end of an ISO week-numbering year, which always starts 3 days before the year's
 * first Thursday.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param date - The original date
 *
 * @returns The end of an ISO week-numbering year
 *
 * @example
 * // The end of an ISO week-numbering year for 2 July 2005:
 * const result = endOfISOWeekYear(new Date(2005, 6, 2))
 * //=> Sun Jan 01 2006 23:59:59.999
 */
declare function endOfISOWeekYear(date: Date): Date;
/**
 * @summary Return the end of an ISO week-numbering year for the given date.
 *
 * @description
 * Return the end of an ISO week-numbering year, which always starts 3 days before the year's
 * first Thursday.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The original date
 *
 * @returns The end of an ISO week-numbering year
 *
 * @example
 * // The end of an ISO week-numbering year for 2 July 2005:
 * const result = endOfISOWeekYear(new Date(2005, 6, 2))
 * //=> Sun Jan 01 2006 23:59:59.999
 */
declare function endOfISOWeekYear<T extends DateLike>(date: T): T;
//#endregion
export { endOfISOWeekYear };
//# sourceMappingURL=end-of-iso-week-year.d.ts.map