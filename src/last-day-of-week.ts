import { withDate } from './helpers/convert.js';
import { resolveWeekStartsOn } from './helpers/default-options.js';
import { isoDayOfWeekToSundayBased } from './helpers/week.js';
import { zeroTime } from './helpers/zero-time.js';
import { type DateLike } from './types.js';
import { type StartOfWeekOptions } from './start-of-week.js';

function daysUntilWeekEnd(isoDayOfWeek: number, weekStartsOn: number): number {
  const sundayBasedDay = isoDayOfWeekToSundayBased(isoDayOfWeek);
  const weekEndsOn = (weekStartsOn + 6) % 7;
  return sundayBasedDay > weekEndsOn
    ? weekEndsOn - sundayBasedDay + 7
    : weekEndsOn - sundayBasedDay;
}

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
export function lastDayOfWeek(date: Date, options?: StartOfWeekOptions): Date;
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
export function lastDayOfWeek<T extends DateLike>(date: T, options?: StartOfWeekOptions): T;
export function lastDayOfWeek(
  date: Date | DateLike,
  options?: StartOfWeekOptions
): Date | DateLike {
  const weekStartsOn = resolveWeekStartsOn(options?.weekStartsOn);

  if (date instanceof Date) {
    return withDate(date, (dateTime) =>
      zeroTime(dateTime.add({ days: daysUntilWeekEnd(dateTime.dayOfWeek, weekStartsOn) }))
    );
  }

  return zeroTime(date.add({ days: daysUntilWeekEnd(date.dayOfWeek, weekStartsOn) }));
}
