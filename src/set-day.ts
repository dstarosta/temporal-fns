import { withDate } from './helpers/convert.js';
import { resolveWeekStartsOn } from './helpers/default-options.js';
import { isoDayOfWeekToSundayBased } from './helpers/week.js';
import { type DateLike } from './types.js';
import { type StartOfWeekOptions } from './start-of-week.js';

function setDayValue<T extends DateLike>(date: T, day: number, weekStartsOn: number): T {
  const currentDay = isoDayOfWeekToSundayBased(date.dayOfWeek);

  const remainder = day % 7;
  const dayIndex = (remainder + 7) % 7;

  const delta = 7 - weekStartsOn;
  const diff =
    day < 0 || day > 6
      ? day - ((currentDay + delta) % 7)
      : ((dayIndex + delta) % 7) - ((currentDay + delta) % 7);

  return date.add({ days: diff }) as T;
}

/**
 * @summary Set the day of the week to the given date.
 *
 * @description
 * Set the day of the week to the given date.
 *
 * @param date - The date to be changed
 * @param day - The day of the week of the new date
 * @param options - An object with options
 *
 * @returns The new date with the day of the week set
 *
 * @example
 * // Set week day to Sunday, with the default weekStartsOn of Sunday:
 * const result = setDay(new Date(2014, 8, 1), 0)
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // Set week day to Sunday, with a weekStartsOn of Monday:
 * const result = setDay(new Date(2014, 8, 1), 0, { weekStartsOn: 1 })
 * //=> Sun Sep 07 2014 00:00:00
 */
export function setDay(date: Date, day: number, options?: StartOfWeekOptions): Date;
/**
 * @summary Set the day of the week to the given date.
 *
 * @description
 * Set the day of the week to the given date.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param day - The day of the week of the new date
 * @param options - An object with options
 *
 * @returns The new date with the day of the week set
 *
 * @example
 * // Set week day to Sunday, with the default weekStartsOn of Sunday:
 * const result = setDay(new Date(2014, 8, 1), 0)
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // Set week day to Sunday, with a weekStartsOn of Monday:
 * const result = setDay(new Date(2014, 8, 1), 0, { weekStartsOn: 1 })
 * //=> Sun Sep 07 2014 00:00:00
 */
export function setDay<T extends DateLike>(date: T, day: number, options?: StartOfWeekOptions): T;
export function setDay(
  date: Date | DateLike,
  day: number,
  options?: StartOfWeekOptions
): Date | DateLike {
  const weekStartsOn = resolveWeekStartsOn(options?.weekStartsOn);
  if (date instanceof Date) {
    return withDate(date, (dateTime) => setDayValue(dateTime, day, weekStartsOn));
  }
  return setDayValue(date, day, weekStartsOn);
}
