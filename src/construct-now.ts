import { type DateLike, type TimeLike } from './types.js';

// "Now" for Date/ZonedDateTime uses a real timezone — ZonedDateTime uses its
// own IANA zone (not the system's), so comparisons stay correct across
// multiple timezones in the same program. PlainDateTime carries no timezone,
// so per the UTC rule its "now" is read as UTC. PlainDate has no time
// component at all, so there is no UTC-vs-local ambiguity to resolve — "today"
// is just the system's current calendar date.
/**
 * @summary Constructs a new current date using the passed value's type.
 *
 * @description
 * Constructs a new current date, using the same concrete type as the reference value (a real
 * timezone for `Date`/`Temporal.ZonedDateTime`, UTC for `Temporal.PlainDateTime`, and today's
 * calendar date for `Temporal.PlainDate`). It helps to build generic functions that accept any
 * `DateLike` type and use the current date.
 *
 * Untyped variant of {@link constructNow} that accepts and returns the `Date | DateLike` union
 * directly, without the overloaded type narrowing.
 *
 * @param date - The reference date to take the type from
 *
 * @returns Current date with the same concrete type as `date`
 */
export function constructNowValue(date: Date | DateLike): Date | DateLike {
  if (date instanceof Date) {
    return new Date(Date.now());
  }
  if (date instanceof Temporal.ZonedDateTime) {
    return Temporal.Now.zonedDateTimeISO(date.timeZoneId);
  }
  if (date instanceof Temporal.PlainDateTime) {
    return Temporal.Now.plainDateTimeISO('UTC');
  }
  return Temporal.Now.plainDateISO();
}

// Narrow variant for the TimeLike-only family (isThisHour/Minute/Second) —
// never produces a PlainDate, since TimeLike excludes it.
export function constructNowTimeValue(date: Date | TimeLike): Date | TimeLike {
  if (date instanceof Date) {
    return new Date(Date.now());
  }
  if (date instanceof Temporal.ZonedDateTime) {
    return Temporal.Now.zonedDateTimeISO(date.timeZoneId);
  }
  return Temporal.Now.plainDateTimeISO('UTC');
}

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
export function constructNow(date: Date): Date;
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
export function constructNow<T extends DateLike>(date: T): T;
export function constructNow(date: Date | DateLike): Date | DateLike {
  return constructNowValue(date);
}
