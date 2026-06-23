import { withDate } from './helpers/convert.js';
import { resolveWeekStartsOn } from './helpers/default-options.js';
import { isoDayOfWeekToSundayBased } from './helpers/week.js';
import { zeroTime } from './helpers/zero-time.js';
import { type DateLike } from './types.js';

/**
 * The {@link startOfWeek} function options.
 */
export interface StartOfWeekOptions {
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

function daysSinceWeekStart(isoDayOfWeek: number, weekStartsOn: number): number {
  const sundayBasedDay = isoDayOfWeekToSundayBased(isoDayOfWeek);
  return sundayBasedDay < weekStartsOn
    ? sundayBasedDay - weekStartsOn + 7
    : sundayBasedDay - weekStartsOn;
}

/**
 * @summary Return the start of a week for the given date.
 *
 * @description
 * Return the start of a week for the given date.
 *
 * Untyped variant of {@link startOfWeek} that accepts and returns the `Date | DateLike` union
 * directly, without the overloaded type narrowing.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The start of a week
 */
export function startOfWeekValue(
  date: Date | DateLike,
  options?: StartOfWeekOptions
): Date | DateLike {
  const weekStartsOn = resolveWeekStartsOn(options?.weekStartsOn);

  if (date instanceof Date) {
    return withDate(date, (dateTime) =>
      zeroTime(dateTime.subtract({ days: daysSinceWeekStart(dateTime.dayOfWeek, weekStartsOn) }))
    );
  }

  return zeroTime(date.subtract({ days: daysSinceWeekStart(date.dayOfWeek, weekStartsOn) }));
}

/**
 * @summary Return the start of a week for the given date.
 *
 * @description
 * Return the start of a week for the given date.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The start of a week
 *
 * @example
 * // The start of a week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // If the week starts on Monday, the start of the week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
 * //=> Mon Sep 01 2014 00:00:00
 */
export function startOfWeek(date: Date, options?: StartOfWeekOptions): Date;
/**
 * @summary Return the start of a week for the given date.
 *
 * @description
 * Return the start of a week for the given date.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The start of a week
 *
 * @example
 * // The start of a week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // If the week starts on Monday, the start of the week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
 * //=> Mon Sep 01 2014 00:00:00
 */
export function startOfWeek<T extends DateLike>(date: T, options?: StartOfWeekOptions): T;
export function startOfWeek(date: Date | DateLike, options?: StartOfWeekOptions): Date | DateLike {
  return startOfWeekValue(date, options);
}
