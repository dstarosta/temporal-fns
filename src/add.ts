import { createAddDateLikeUnit, createAddTimeLikeUnit } from './helpers/create-add-unit.js';
import { type Duration } from './format-duration.js';
import { type DateLike, type TimeLike } from './types.js';

const addMonthsValue = createAddDateLikeUnit('months', 1);
const addDaysValue = createAddDateLikeUnit('days', 1);
const addHoursValue = createAddTimeLikeUnit('hours', 1);
const addMinutesValue = createAddTimeLikeUnit('minutes', 1);
const addSecondsValue = createAddTimeLikeUnit('seconds', 1);

function hasTimeFields(duration: Duration): boolean {
  return Boolean(duration.hours ?? duration.minutes ?? duration.seconds);
}

function applyTimeFields(date: Date | TimeLike, duration: Duration): Date | TimeLike {
  let result = date;
  if (duration.hours) {
    result = addHoursValue(result, duration.hours);
  }
  if (duration.minutes) {
    result = addMinutesValue(result, duration.minutes);
  }
  if (duration.seconds) {
    result = addSecondsValue(result, duration.seconds);
  }
  return result;
}

/**
 * @summary Add the specified years, months, weeks, days, hours, minutes and seconds to the given date.
 *
 * @description
 * Add the specified years, months, weeks, days, hours, minutes and seconds to the given date.
 *
 * Untyped variant of {@link add} that accepts and returns the `Date | DateLike` union directly,
 * without the overloaded type narrowing. Throws a `TypeError` if `duration` has any of
 * `hours`/`minutes`/`seconds` set and `date` is a `Temporal.PlainDate`, since plain dates have no time component.
 *
 * @param date - The date to be changed
 * @param duration - The object with years, months, weeks, days, hours, minutes and seconds to be added
 *
 * @returns The new date with the seconds added
 *
 * @example
 * // Add the following duration to 1 September 2014, 10:19:50
 * const result = addValue(new Date(2014, 8, 1, 10, 19, 50), {
 *   years: 2,
 *   months: 9,
 *   weeks: 1,
 *   days: 7,
 *   hours: 5,
 *   minutes: 9,
 *   seconds: 30,
 * })
 * //=> Thu Jun 15 2017 15:29:20
 */
export function addValue(date: Date | DateLike, duration: Duration): Date | DateLike {
  if (date instanceof Temporal.PlainDate && hasTimeFields(duration)) {
    throw new TypeError('Cannot add hours/minutes/seconds to a Temporal.PlainDate.');
  }

  const months = (duration.months ?? 0) + (duration.years ?? 0) * 12;
  const days = (duration.days ?? 0) + (duration.weeks ?? 0) * 7;

  let result: Date | DateLike = months ? addMonthsValue(date, months) : date;
  result = days ? addDaysValue(result, days) : result;
  result = applyTimeFields(result as Date | TimeLike, duration);

  return result;
}

/**
 * @summary Add the specified years, months, weeks, days, hours, minutes and seconds to the given date.
 *
 * @description
 * Add the specified years, months, weeks, days, hours, minutes and seconds to the given date.
 *
 * Throws a `TypeError` if `duration` has any of `hours`/`minutes`/`seconds` set and `date` is a
 * `Temporal.PlainDate`, since plain dates have no time component.
 *
 * @param date - The date to be changed
 * @param duration - The object with years, months, weeks, days, hours, minutes and seconds to be added
 *
 * @returns The new date with the seconds added
 *
 * @example
 * // Add the following duration to 1 September 2014, 10:19:50
 * const result = add(new Date(2014, 8, 1, 10, 19, 50), {
 *   years: 2,
 *   months: 9,
 *   weeks: 1,
 *   days: 7,
 *   hours: 5,
 *   minutes: 9,
 *   seconds: 30,
 * })
 * //=> Thu Jun 15 2017 15:29:20
 */
export function add(date: Date, duration: Duration): Date;
/**
 * @summary Add the specified years, months, weeks, days, hours, minutes and seconds to the given date.
 *
 * @description
 * Add the specified years, months, weeks, days, hours, minutes and seconds to the given date.
 *
 * Throws a `TypeError` if `duration` has any of `hours`/`minutes`/`seconds` set and `date` is a
 * `Temporal.PlainDate`, since plain dates have no time component.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param duration - The object with years, months, weeks, days, hours, minutes and seconds to be added
 *
 * @returns The new date with the seconds added
 *
 * @example
 * // Add the following duration to 1 September 2014, 10:19:50
 * const result = add(new Date(2014, 8, 1, 10, 19, 50), {
 *   years: 2,
 *   months: 9,
 *   weeks: 1,
 *   days: 7,
 *   hours: 5,
 *   minutes: 9,
 *   seconds: 30,
 * })
 * //=> Thu Jun 15 2017 15:29:20
 */
export function add<T extends DateLike>(date: T, duration: Duration): T;
export function add(date: Date | DateLike, duration: Duration): Date | DateLike {
  return addValue(date, duration);
}
