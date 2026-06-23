import { DateLike } from "./types.js";

//#region src/last-day-of-iso-week.d.ts
/**
 * @summary Return the last day of an ISO week for the given date.
 *
 * @description
 * Return the last day of an ISO week for the given date.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param date - The original date
 *
 * @returns The last day of an ISO week
 *
 * @example
 * // The last day of an ISO week for 2 September 2014 11:55:00:
 * const result = lastDayOfISOWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Sep 07 2014 00:00:00
 */
declare function lastDayOfISOWeek(date: Date): Date;
/**
 * @summary Return the last day of an ISO week for the given date.
 *
 * @description
 * Return the last day of an ISO week for the given date.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The original date
 *
 * @returns The last day of an ISO week
 *
 * @example
 * // The last day of an ISO week for 2 September 2014 11:55:00:
 * const result = lastDayOfISOWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Sep 07 2014 00:00:00
 */
declare function lastDayOfISOWeek<T extends DateLike>(date: T): T;
//#endregion
export { lastDayOfISOWeek };
//# sourceMappingURL=last-day-of-iso-week.d.ts.map