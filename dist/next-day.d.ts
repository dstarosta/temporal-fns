import { DateLike } from "./types.js";

//#region src/next-day.d.ts
/**
 * @summary When is the next day of the week? 0-6 the day of the week, 0 represents Sunday.
 *
 * @param date - The date to check
 * @param day - Day of the week
 *
 * @returns The date is the next day of the week
 *
 * @example
 * // When is the next Monday after Mar, 20, 2020?
 * const result = nextDay(new Date(2020, 2, 20), 1)
 * //=> Mon Mar 23 2020 00:00:00
 *
 * @example
 * // When is the next Tuesday after Mar, 21, 2020?
 * const result = nextDay(new Date(2020, 2, 21), 2)
 * //=> Tue Mar 24 2020 00:00:00
 */
declare function nextDay(date: Date, day: number): Date;
/**
 * @summary When is the next day of the week? 0-6 the day of the week, 0 represents Sunday.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to check
 * @param day - Day of the week
 *
 * @returns The date is the next day of the week
 *
 * @example
 * // When is the next Monday after Mar, 20, 2020?
 * const result = nextDay(new Date(2020, 2, 20), 1)
 * //=> Mon Mar 23 2020 00:00:00
 *
 * @example
 * // When is the next Tuesday after Mar, 21, 2020?
 * const result = nextDay(new Date(2020, 2, 21), 2)
 * //=> Tue Mar 24 2020 00:00:00
 */
declare function nextDay<T extends DateLike>(date: T, day: number): T;
//#endregion
export { nextDay };
//# sourceMappingURL=next-day.d.ts.map