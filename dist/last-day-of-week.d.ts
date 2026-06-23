import { DateLike } from "./types.js";
import { StartOfWeekOptions } from "./start-of-week.js";

//#region src/last-day-of-week.d.ts
/**
 * @summary Return the last day of a week for the given date.
 *
 * @description
 * Return the last day of a week for the given date.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The last day of a week
 */
declare function lastDayOfWeek(date: Date, options?: StartOfWeekOptions): Date;
/**
 * @summary Return the last day of a week for the given date.
 *
 * @description
 * Return the last day of a week for the given date.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The last day of a week
 */
declare function lastDayOfWeek<T extends DateLike>(date: T, options?: StartOfWeekOptions): T;
//#endregion
export { lastDayOfWeek };
//# sourceMappingURL=last-day-of-week.d.ts.map