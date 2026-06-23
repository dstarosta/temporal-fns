import { DateLike } from "./types.js";

//#region src/construct-now.d.ts
/**
 * @summary Constructs a new current date using the passed value's type.
 *
 * @description
 * Constructs a new current date, using the same concrete type as the reference value (a real
 * timezone for `Date`/`Temporal.ZonedDateTime`, UTC for `Temporal.PlainDateTime`, and today's
 * calendar date for `Temporal.PlainDate`). It helps to build generic functions that accept any
 * `DateLike` type and use the current date.
 *
 * @param date - The reference date to take the type from
 *
 * @returns Current date with the same concrete type as `date`
 *
 * @example
 * function isToday<T extends Date>(date: T): boolean {
 *   // If we were to use `new Date()` directly, the function would behave
 *   // differently in different timezones and return false for the same date.
 *   return isSameDay(date, constructNow(date));
 * }
 */
declare function constructNow(date: Date): Date;
/**
 * @summary Constructs a new current date using the passed value's type.
 *
 * @description
 * Constructs a new current date, using the same concrete type as the reference value (a real
 * timezone for `Date`/`Temporal.ZonedDateTime`, UTC for `Temporal.PlainDateTime`, and today's
 * calendar date for `Temporal.PlainDate`). It helps to build generic functions that accept any
 * `DateLike` type and use the current date.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The reference date to take the type from
 *
 * @returns Current date with the same concrete type as `date`
 *
 * @example
 * function isToday<T extends Date>(date: T): boolean {
 *   // If we were to use `new Date()` directly, the function would behave
 *   // differently in different timezones and return false for the same date.
 *   return isSameDay(date, constructNow(date));
 * }
 */
declare function constructNow<T extends DateLike>(date: T): T;
//#endregion
export { constructNow };
//# sourceMappingURL=construct-now.d.ts.map