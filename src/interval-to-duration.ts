import { addValue as add } from './add.js';
import { type Duration } from './format-duration.js';
import { createDifferenceInTimeUnitValue } from './helpers/create-difference-in-unit.js';
import { differenceInDaysFields, differenceInYearsFields } from './helpers/difference-fields.js';
import { differenceInMonthsValue } from './helpers/create-difference-in-date-unit.js';
import { getDateTimeFields } from './helpers/format-fields.js';
import { type Interval, type TimeLike } from './types.js';

const differenceInHoursValue = createDifferenceInTimeUnitValue('hours');
const differenceInMinutesValue = createDifferenceInTimeUnitValue('minutes');
const differenceInSecondsValue = createDifferenceInTimeUnitValue('seconds');

/**
 * @summary Convert interval to duration
 *
 * @description
 * Convert an interval object to a duration object.
 *
 * @param interval - The interval to convert to duration
 *
 * @returns The duration object
 *
 * @example
 * // Get the duration between January 15, 1929 and April 4, 1968.
 * intervalToDuration({
 *   start: new Date(1929, 0, 15, 12, 0, 0),
 *   end: new Date(1968, 3, 4, 19, 5, 0)
 * });
 * //=> { years: 39, months: 2, days: 20, hours: 7, minutes: 5, seconds: 0 }
 */
export function intervalToDuration(interval: Interval<Date>): Duration;
/**
 * @summary Convert interval to duration
 *
 * @description
 * Convert an interval object to a duration object.
 *
 * @typeParam T - A {@link TimeLike} type (`Temporal.PlainDateTime` or `Temporal.ZonedDateTime`).
 * Inferred from `interval`.
 *
 * @param interval - The interval to convert to duration
 *
 * @returns The duration object
 *
 * @example
 * // Get the duration between January 15, 1929 and April 4, 1968.
 * intervalToDuration({
 *   start: new Date(1929, 0, 15, 12, 0, 0),
 *   end: new Date(1968, 3, 4, 19, 5, 0)
 * });
 * //=> { years: 39, months: 2, days: 20, hours: 7, minutes: 5, seconds: 0 }
 */
export function intervalToDuration<T extends TimeLike>(interval: Interval<T>): Duration;
export function intervalToDuration(interval: Interval<Date | TimeLike>): Duration {
  const { start, end } = interval;
  const duration: Duration = {};

  const years = differenceInYearsFields(getDateTimeFields(end), getDateTimeFields(start));
  if (years) {
    duration.years = years;
  }

  const remainingMonths = duration.years ? add(start, { years: duration.years }) : start;
  const months = differenceInMonthsValue(end, remainingMonths);
  if (months) {
    duration.months = months;
  }

  const remainingDays = duration.months
    ? add(remainingMonths, { months: duration.months })
    : remainingMonths;
  const days = differenceInDaysFields(getDateTimeFields(end), getDateTimeFields(remainingDays));
  if (days) {
    duration.days = days;
  }

  // remainingDays is never a Temporal.PlainDate here: the `interval` overloads
  // only accept Date | TimeLike (PlainDate has no time component, so it's
  // deliberately excluded), and `add` never changes a value's Temporal type.
  const remainingHours = (
    duration.days ? add(remainingDays, { days: duration.days }) : remainingDays
  ) as Date | TimeLike;
  const hours = differenceInHoursValue(end, remainingHours);
  if (hours) {
    duration.hours = hours;
  }

  const remainingMinutes = (
    duration.hours ? add(remainingHours, { hours: duration.hours }) : remainingHours
  ) as Date | TimeLike;
  const minutes = differenceInMinutesValue(end, remainingMinutes);
  if (minutes) {
    duration.minutes = minutes;
  }

  const remainingSeconds = (
    duration.minutes ? add(remainingMinutes, { minutes: duration.minutes }) : remainingMinutes
  ) as Date | TimeLike;
  const seconds = differenceInSecondsValue(end, remainingSeconds);
  if (seconds) {
    duration.seconds = seconds;
  }

  return duration;
}
