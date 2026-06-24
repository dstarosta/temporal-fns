import { differenceInCalendarDaysValue } from './difference-in-calendar-days.js';
import { differenceInCalendarMonthsValue } from './difference-in-calendar-months.js';
import { differenceInCalendarQuartersValue } from './difference-in-calendar-quarters.js';
import { differenceInCalendarWeeksValue } from './difference-in-calendar-weeks.js';
import { differenceInCalendarYearsValue } from './difference-in-calendar-years.js';
import { differenceInHoursValue } from './difference-in-hours.js';
import { differenceInMinutesValue } from './difference-in-minutes.js';
import { differenceInSecondsValue } from './difference-in-seconds.js';
import { getCachedRelativeTimeFormat } from './helpers/intl-cache.js';
import { type DateLike } from './types.js';

export type IntlFormatDistanceUnit =
  | 'year'
  | 'quarter'
  | 'month'
  | 'week'
  | 'day'
  | 'hour'
  | 'minute'
  | 'second';

/**
 * The {@link intlFormatDistance} function options.
 */
export interface IntlFormatDistanceOptions extends Intl.RelativeTimeFormatOptions {
  unit?: IntlFormatDistanceUnit;
  locale?: Intl.LocalesArgument;
}

const secondsInDay = 86_400;
const secondsInMinute = 60;
const secondsInHour = 3600;
const secondsInWeek = 604_800;
const secondsInMonth = 2_629_800;
const secondsInQuarter = secondsInMonth * 3;
const secondsInYear = 31_557_600;

// Temporal.PlainDate has no time-of-day, so two PlainDates are always a
// whole number of calendar days apart — that elapsed time is always an exact
// multiple of 86400 seconds, computable without a TimeLike constraint.
function differenceInSecondsOf(laterDate: Date | DateLike, earlierDate: Date | DateLike): number {
  if (!(laterDate instanceof Temporal.PlainDate) && !(earlierDate instanceof Temporal.PlainDate)) {
    return differenceInSecondsValue(laterDate, earlierDate);
  }
  return differenceInCalendarDaysValue(laterDate, earlierDate) * secondsInDay;
}

function differenceInMinutesOf(laterDate: Date | DateLike, earlierDate: Date | DateLike): number {
  if (!(laterDate instanceof Temporal.PlainDate) && !(earlierDate instanceof Temporal.PlainDate)) {
    return differenceInMinutesValue(laterDate, earlierDate);
  }
  return differenceInCalendarDaysValue(laterDate, earlierDate) * (secondsInDay / 60);
}

function differenceInHoursOf(laterDate: Date | DateLike, earlierDate: Date | DateLike): number {
  if (!(laterDate instanceof Temporal.PlainDate) && !(earlierDate instanceof Temporal.PlainDate)) {
    return differenceInHoursValue(laterDate, earlierDate);
  }
  return differenceInCalendarDaysValue(laterDate, earlierDate) * 24;
}

function pickUnitAndValue(
  laterDate: Date | DateLike,
  earlierDate: Date | DateLike
): { unit: IntlFormatDistanceUnit; value: number } {
  const diffInSeconds = differenceInSecondsOf(laterDate, earlierDate);
  const absDiffInSeconds = Math.abs(diffInSeconds);

  if (absDiffInSeconds < secondsInMinute) {
    return { unit: 'second', value: diffInSeconds };
  }
  if (absDiffInSeconds < secondsInHour) {
    return { unit: 'minute', value: differenceInMinutesOf(laterDate, earlierDate) };
  }
  if (
    absDiffInSeconds < secondsInDay &&
    Math.abs(differenceInCalendarDaysValue(laterDate, earlierDate)) < 1
  ) {
    return { unit: 'hour', value: differenceInHoursOf(laterDate, earlierDate) };
  }
  if (absDiffInSeconds < secondsInWeek) {
    const days = differenceInCalendarDaysValue(laterDate, earlierDate);
    if (Math.abs(days) < 7) {
      return { unit: 'day', value: days };
    }
  }
  if (absDiffInSeconds < secondsInMonth) {
    return { unit: 'week', value: differenceInCalendarWeeksValue(laterDate, earlierDate) };
  }
  if (absDiffInSeconds < secondsInQuarter) {
    return { unit: 'month', value: differenceInCalendarMonthsValue(laterDate, earlierDate) };
  }
  if (absDiffInSeconds < secondsInYear) {
    const quarters = differenceInCalendarQuartersValue(laterDate, earlierDate);
    if (Math.abs(quarters) < 4) {
      return { unit: 'quarter', value: quarters };
    }
    return { unit: 'year', value: differenceInCalendarYearsValue(laterDate, earlierDate) };
  }
  return { unit: 'year', value: differenceInCalendarYearsValue(laterDate, earlierDate) };
}

function valueForUnit(
  unit: IntlFormatDistanceUnit,
  laterDate: Date | DateLike,
  earlierDate: Date | DateLike
): number {
  switch (unit) {
    case 'second': {
      return differenceInSecondsOf(laterDate, earlierDate);
    }
    case 'minute': {
      return differenceInMinutesOf(laterDate, earlierDate);
    }
    case 'hour': {
      return differenceInHoursOf(laterDate, earlierDate);
    }
    case 'day': {
      return differenceInCalendarDaysValue(laterDate, earlierDate);
    }
    case 'week': {
      return differenceInCalendarWeeksValue(laterDate, earlierDate);
    }
    case 'month': {
      return differenceInCalendarMonthsValue(laterDate, earlierDate);
    }
    case 'quarter': {
      return differenceInCalendarQuartersValue(laterDate, earlierDate);
    }
    case 'year': {
      return differenceInCalendarYearsValue(laterDate, earlierDate);
    }
  }
}

/**
 * @summary Formats distance between two dates in a human-readable format
 *
 * @description
 * The function calculates the difference between two dates and formats it as a human-readable
 * string.
 *
 * The function will pick the most appropriate unit depending on the distance between dates. For
 * example, if the distance is a few hours, it might return `x hours`. If the distance is a few
 * months, it might return `x months`.
 *
 * You can also specify a unit to force using it regardless of the distance to get a result like
 * `123456 hours`.
 *
 * See the table below for the unit picking logic:
 *
 * | Distance between dates | Result (past)  | Result (future) |
 * | ------------------------ | -------------- | --------------- |
 * | 0 seconds              | now            | now             |
 * | 1-59 seconds           | X seconds ago  | in X seconds    |
 * | 1-59 minutes           | X minutes ago  | in X minutes    |
 * | 1-23 hours             | X hours ago    | in X hours      |
 * | 1 day                  | yesterday      | tomorrow        |
 * | 2-6 days               | X days ago     | in X days       |
 * | 7 days                 | last week      | next week       |
 * | 8 days-1 month         | X weeks ago    | in X weeks      |
 * | 1 month                | last month     | next month      |
 * | 2-3 months             | X months ago   | in X months     |
 * | 1 quarter              | last quarter   | next quarter    |
 * | 2-3 quarters           | X quarters ago | in X quarters   |
 * | 1 year                 | last year      | next year       |
 * | 2+ years               | X years ago    | in X years      |
 *
 * @param laterDate - The date
 * @param earlierDate - The date to compare with
 * @param options - An object with options. See MDN for details on
 * [Locale identification and negotiation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locale_identification_and_negotiation).
 *
 * @returns The distance in words according to language-sensitive relative time formatting.
 *
 * @example
 * // What is the distance between the dates when the fist date is after the second?
 * intlFormatDistance(
 *   new Date(1986, 3, 4, 11, 30, 0),
 *   new Date(1986, 3, 4, 10, 30, 0)
 * )
 * //=> 'in 1 hour'
 *
 * // What is the distance between the dates when the fist date is before the second?
 * intlFormatDistance(
 *   new Date(1986, 3, 4, 10, 30, 0),
 *   new Date(1986, 3, 4, 11, 30, 0)
 * )
 * //=> '1 hour ago'
 *
 * @example
 * // Use the unit option to force the function to output the result in quarters. Without setting it, the example would return "next year"
 * intlFormatDistance(
 *   new Date(1987, 6, 4, 10, 30, 0),
 *   new Date(1986, 3, 4, 10, 30, 0),
 *   { unit: 'quarter' }
 * )
 * //=> 'in 5 quarters'
 *
 * @example
 * // Use the locale option to get the result in Spanish. Without setting it, the example would return "in 1 hour".
 * intlFormatDistance(
 *   new Date(1986, 3, 4, 11, 30, 0),
 *   new Date(1986, 3, 4, 10, 30, 0),
 *   { locale: 'es' }
 * )
 * //=> 'dentro de 1 hora'
 *
 * @example
 * // Use the numeric option to force the function to use numeric values. Without setting it, the example would return "tomorrow".
 * intlFormatDistance(
 *   new Date(1986, 3, 5, 11, 30, 0),
 *   new Date(1986, 3, 4, 11, 30, 0),
 *   { numeric: 'always' }
 * )
 * //=> 'in 1 day'
 *
 * @example
 * // Use the style option to force the function to use short values. Without setting it, the example would return "in 2 years".
 * intlFormatDistance(
 *   new Date(1988, 3, 4, 11, 30, 0),
 *   new Date(1986, 3, 4, 11, 30, 0),
 *   { style: 'short' }
 * )
 * //=> 'in 2 yr'
 */
export function intlFormatDistance(
  laterDate: Date,
  earlierDate: Date,
  options?: IntlFormatDistanceOptions
): string;
/**
 * @summary Formats distance between two dates in a human-readable format
 *
 * @description
 * The function calculates the difference between two dates and formats it as a human-readable
 * string.
 *
 * The function will pick the most appropriate unit depending on the distance between dates. For
 * example, if the distance is a few hours, it might return `x hours`. If the distance is a few
 * months, it might return `x months`.
 *
 * You can also specify a unit to force using it regardless of the distance to get a result like
 * `123456 hours`.
 *
 * See the table below for the unit picking logic:
 *
 * | Distance between dates | Result (past)  | Result (future) |
 * | ------------------------ | -------------- | --------------- |
 * | 0 seconds              | now            | now             |
 * | 1-59 seconds           | X seconds ago  | in X seconds    |
 * | 1-59 minutes           | X minutes ago  | in X minutes    |
 * | 1-23 hours             | X hours ago    | in X hours      |
 * | 1 day                  | yesterday      | tomorrow        |
 * | 2-6 days               | X days ago     | in X days       |
 * | 7 days                 | last week      | next week       |
 * | 8 days-1 month         | X weeks ago    | in X weeks      |
 * | 1 month                | last month     | next month      |
 * | 2-3 months             | X months ago   | in X months     |
 * | 1 quarter              | last quarter   | next quarter    |
 * | 2-3 quarters           | X quarters ago | in X quarters   |
 * | 1 year                 | last year      | next year       |
 * | 2+ years               | X years ago    | in X years      |
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `laterDate`/`earlierDate`, which must share the same
 * concrete type.
 *
 * @param laterDate - The date
 * @param earlierDate - The date to compare with
 * @param options - An object with options. See MDN for details on
 * [Locale identification and negotiation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locale_identification_and_negotiation).
 *
 * @returns The distance in words according to language-sensitive relative time formatting.
 *
 * @example
 * // What is the distance between the dates when the fist date is after the second?
 * intlFormatDistance(
 *   new Date(1986, 3, 4, 11, 30, 0),
 *   new Date(1986, 3, 4, 10, 30, 0)
 * )
 * //=> 'in 1 hour'
 *
 * // What is the distance between the dates when the fist date is before the second?
 * intlFormatDistance(
 *   new Date(1986, 3, 4, 10, 30, 0),
 *   new Date(1986, 3, 4, 11, 30, 0)
 * )
 * //=> '1 hour ago'
 *
 * @example
 * // Use the unit option to force the function to output the result in quarters. Without setting it, the example would return "next year"
 * intlFormatDistance(
 *   new Date(1987, 6, 4, 10, 30, 0),
 *   new Date(1986, 3, 4, 10, 30, 0),
 *   { unit: 'quarter' }
 * )
 * //=> 'in 5 quarters'
 *
 * @example
 * // Use the locale option to get the result in Spanish. Without setting it, the example would return "in 1 hour".
 * intlFormatDistance(
 *   new Date(1986, 3, 4, 11, 30, 0),
 *   new Date(1986, 3, 4, 10, 30, 0),
 *   { locale: 'es' }
 * )
 * //=> 'dentro de 1 hora'
 *
 * @example
 * // Use the numeric option to force the function to use numeric values. Without setting it, the example would return "tomorrow".
 * intlFormatDistance(
 *   new Date(1986, 3, 5, 11, 30, 0),
 *   new Date(1986, 3, 4, 11, 30, 0),
 *   { numeric: 'always' }
 * )
 * //=> 'in 1 day'
 *
 * @example
 * // Use the style option to force the function to use short values. Without setting it, the example would return "in 2 years".
 * intlFormatDistance(
 *   new Date(1988, 3, 4, 11, 30, 0),
 *   new Date(1986, 3, 4, 11, 30, 0),
 *   { style: 'short' }
 * )
 * //=> 'in 2 yr'
 */
export function intlFormatDistance<T extends DateLike>(
  laterDate: T,
  earlierDate: T,
  options?: IntlFormatDistanceOptions
): string;
export function intlFormatDistance(
  laterDate: Date | DateLike,
  earlierDate: Date | DateLike,
  options?: IntlFormatDistanceOptions
): string {
  const { unit, value } = options?.unit
    ? { unit: options.unit, value: valueForUnit(options.unit, laterDate, earlierDate) }
    : pickUnitAndValue(laterDate, earlierDate);

  const rtf = getCachedRelativeTimeFormat(options?.locale, { numeric: 'auto', ...options });
  return rtf.format(value, unit);
}
