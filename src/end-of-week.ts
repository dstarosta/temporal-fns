import { withDate } from './helpers/convert.js';
import { resolveWeekStartsOn } from './helpers/default-options.js';
import { isoDayOfWeekToSundayBased } from './helpers/week.js';
import { endTime } from './helpers/zero-time.js';
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
 * @summary Return the end of a week for the given date.
 *
 * @description
 * Return the end of a week for the given date.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The end of a week
 *
 * @example
 * // The end of a week for 2 September 2014 11:55:00:
 * const result = endOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sat Sep 06 2014 23:59:59.999
 *
 * @example
 * // If the week starts on Monday, the end of the week for 2 September 2014 11:55:00:
 * const result = endOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
 * //=> Sun Sep 07 2014 23:59:59.999
 */
export function endOfWeek(date: Date, options?: StartOfWeekOptions): Date;
/**
 * @summary Return the end of a week for the given date.
 *
 * @description
 * Return the end of a week for the given date.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The end of a week
 *
 * @example
 * // The end of a week for 2 September 2014 11:55:00:
 * const result = endOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sat Sep 06 2014 23:59:59.999
 *
 * @example
 * // If the week starts on Monday, the end of the week for 2 September 2014 11:55:00:
 * const result = endOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
 * //=> Sun Sep 07 2014 23:59:59.999
 */
export function endOfWeek<T extends DateLike>(date: T, options?: StartOfWeekOptions): T;
export function endOfWeek(date: Date | DateLike, options?: StartOfWeekOptions): Date | DateLike {
  const weekStartsOn = resolveWeekStartsOn(options?.weekStartsOn);

  if (date instanceof Date) {
    return withDate(date, (dateTime) =>
      endTime(dateTime.add({ days: daysUntilWeekEnd(dateTime.dayOfWeek, weekStartsOn) }))
    );
  }

  return endTime(date.add({ days: daysUntilWeekEnd(date.dayOfWeek, weekStartsOn) }));
}
