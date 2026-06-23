import { createAddDateLikeUnit, createAddTimeLikeUnit } from './helpers/create-add-unit.js';
import { type Duration } from './format-duration.js';
import { type DateLike, type TimeLike } from './types.js';

const subMonthsValue = createAddDateLikeUnit('months', -1);
const subDaysValue = createAddDateLikeUnit('days', -1);
const subHoursValue = createAddTimeLikeUnit('hours', -1);
const subMinutesValue = createAddTimeLikeUnit('minutes', -1);
const subSecondsValue = createAddTimeLikeUnit('seconds', -1);

function hasTimeFields(duration: Duration): boolean {
  return Boolean(duration.hours ?? duration.minutes ?? duration.seconds);
}

function applyTimeFields(date: Date | TimeLike, duration: Duration): Date | TimeLike {
  let result = date;
  if (duration.hours) {
    result = subHoursValue(result, duration.hours);
  }
  if (duration.minutes) {
    result = subMinutesValue(result, duration.minutes);
  }
  if (duration.seconds) {
    result = subSecondsValue(result, duration.seconds);
  }
  return result;
}

/**
 * @summary Subtract the specified years, months, weeks, days, hours, minutes and seconds from the given date.
 *
 * @description
 * Subtract the specified years, months, weeks, days, hours, minutes and seconds from the given date.
 *
 * Throws a `TypeError` if `duration` has any of `hours`/`minutes`/`seconds` set and `date` is a
 * `Temporal.PlainDate`, since plain dates have no time component.
 *
 * @param date - The date to be changed
 * @param duration - The object with years, months, weeks, days, hours, minutes and seconds to be subtracted
 *
 * @returns The new date with the seconds subtracted
 *
 * @example
 * // Subtract the following duration from 15 June 2017 15:29:20
 * const result = sub(new Date(2017, 5, 15, 15, 29, 20), {
 *   years: 2,
 *   months: 9,
 *   weeks: 1,
 *   days: 7,
 *   hours: 5,
 *   minutes: 9,
 *   seconds: 30
 * })
 * //=> Mon Sep 1 2014 10:19:50
 */
export function sub(date: Date, duration: Duration): Date;
/**
 * @summary Subtract the specified years, months, weeks, days, hours, minutes and seconds from the given date.
 *
 * @description
 * Subtract the specified years, months, weeks, days, hours, minutes and seconds from the given date.
 *
 * Throws a `TypeError` if `duration` has any of `hours`/`minutes`/`seconds` set and `date` is a
 * `Temporal.PlainDate`, since plain dates have no time component.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param duration - The object with years, months, weeks, days, hours, minutes and seconds to be subtracted
 *
 * @returns The new date with the seconds subtracted
 *
 * @example
 * // Subtract the following duration from 15 June 2017 15:29:20
 * const result = sub(new Date(2017, 5, 15, 15, 29, 20), {
 *   years: 2,
 *   months: 9,
 *   weeks: 1,
 *   days: 7,
 *   hours: 5,
 *   minutes: 9,
 *   seconds: 30
 * })
 * //=> Mon Sep 1 2014 10:19:50
 */
export function sub<T extends DateLike>(date: T, duration: Duration): T;
export function sub(date: Date | DateLike, duration: Duration): Date | DateLike {
  if (date instanceof Temporal.PlainDate && hasTimeFields(duration)) {
    throw new TypeError('Cannot subtract hours/minutes/seconds from a Temporal.PlainDate.');
  }

  const months = (duration.months ?? 0) + (duration.years ?? 0) * 12;
  const days = (duration.days ?? 0) + (duration.weeks ?? 0) * 7;

  let result: Date | DateLike = months ? subMonthsValue(date, months) : date;
  result = days ? subDaysValue(result, days) : result;
  result = applyTimeFields(result as Date | TimeLike, duration);

  return result;
}
