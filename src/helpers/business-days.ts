import { isoDayOfWeekToSundayBased } from './week.js';
import { withDate } from './convert.js';
import { type DateLike } from '../types.js';

export function isWeekendDayOfWeek(sundayBasedDay: number): boolean {
  return sundayBasedDay === 0 || sundayBasedDay === 6;
}

// When the original date and the landing date both fall on a weekend (only
// possible when amount is an exact multiple of 5), nudges the landing date
// onto the nearest weekday in the direction `sign` is moving.
function weekendLandingCorrectionDays(sundayBasedDay: number, sign: 1 | -1): number {
  if (sundayBasedDay === 6) {
    return sign < 0 ? 2 : -1;
  }
  return sign < 0 ? 1 : -2;
}

// Ports date-fns' addBusinessDays algorithm onto Temporal calendar-field
// arithmetic (.add/.subtract on days), which has no DST-hour-drift to correct
// for — unlike date-fns' own Date-based implementation, which must explicitly
// restore the original hour after mutating the date across a DST boundary.
function addBusinessDaysToDate<T extends DateLike>(date: T, amount: number): T {
  const startedOnWeekend = isWeekendDayOfWeek(isoDayOfWeekToSundayBased(date.dayOfWeek));

  const sign = amount < 0 ? -1 : 1;
  const fullWeeks = Math.trunc(amount / 5);

  let result = date.add({ days: fullWeeks * 7 }) as T;

  let restDays = Math.abs(amount % 5);
  while (restDays > 0) {
    result = result.add({ days: sign }) as T;
    if (!isWeekendDayOfWeek(isoDayOfWeekToSundayBased(result.dayOfWeek))) {
      restDays -= 1;
    }
  }

  const resultSundayBasedDay = isoDayOfWeekToSundayBased(result.dayOfWeek);
  if (startedOnWeekend && isWeekendDayOfWeek(resultSundayBasedDay) && amount !== 0) {
    result = result.add({ days: weekendLandingCorrectionDays(resultSundayBasedDay, sign) }) as T;
  }

  return result;
}

/**
 * @summary Add the specified number of business days (mon - fri) to the given date.
 *
 * @description
 * Add the specified number of business days (mon - fri) to the given date, ignoring weekends.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param amount - The amount of business days to be added.
 *
 * @returns The new date with the business days added
 *
 * @example
 * // Add 10 business days to 1 September 2014:
 * const result = addBusinessDays(new Date(2014, 8, 1), 10)
 * //=> Mon Sep 15 2014 00:00:00 (skipped weekend days)
 */
export function addBusinessDays(date: Date, amount: number): Date;
export function addBusinessDays<T extends DateLike>(date: T, amount: number): T;
export function addBusinessDays(date: Date | DateLike, amount: number): Date | DateLike {
  if (date instanceof Date) {
    return withDate(date, (dateTime) => addBusinessDaysToDate(dateTime, amount));
  }
  return addBusinessDaysToDate(date, amount);
}
