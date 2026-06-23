import { setMonth } from './set-month.js';
import { setYearValue } from './set-year.js';
import { setDateValue } from './set-date.js';
import { withDate } from './helpers/convert.js';
import { type DateLike } from './types.js';

/**
 * The {@link set} function values.
 */
export interface DateValues {
  year?: number;
  month?: number;
  date?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
}

function hasTimeField(values: DateValues): boolean {
  return (
    values.hours != null ||
    values.minutes != null ||
    values.seconds != null ||
    values.milliseconds != null
  );
}

function setValue<T extends DateLike>(date: T, values: DateValues): T {
  let result = date;

  if (values.year != null) {
    result = setYearValue(result, values.year);
  }
  if (values.month != null) {
    result = setMonth(result, values.month);
  }
  if (values.date != null) {
    result = setDateValue(result, values.date);
  }

  if (hasTimeField(values)) {
    if (result instanceof Temporal.PlainDate) {
      throw new TypeError('Cannot set hours/minutes/seconds/milliseconds on a Temporal.PlainDate.');
    }
    if (values.hours != null) {
      result = result.with({ hour: values.hours }) as T;
    }
    if (values.minutes != null) {
      result = result.with({ minute: values.minutes }) as T;
    }
    if (values.seconds != null) {
      result = result.with({ second: values.seconds }) as T;
    }
    if (values.milliseconds != null) {
      result = result.with({ millisecond: values.milliseconds }) as T;
    }
  }

  return result;
}

/**
 * @summary Set date values to a given date.
 *
 * @description
 * Set date values to a given date.
 *
 * Sets fields on the date from object `values`. A value is not set if it is `undefined`, `null`,
 * or doesn't exist in `values`. Throws a `TypeError` if any of `hours`/`minutes`/`seconds`/
 * `milliseconds` is set and `date` is a `Temporal.PlainDate`, since plain dates have no time
 * component.
 *
 * @param date - The date to be changed
 * @param values - The date values to be set
 *
 * @returns The new date with options set
 *
 * @example
 * // Transform 1 September 2014 into 20 October 2015 in a single line:
 * const result = set(new Date(2014, 8, 20), { year: 2015, month: 9, date: 20 })
 * //=> Tue Oct 20 2015 00:00:00
 *
 * @example
 * // Set 12 PM to 1 September 2014 01:23:45 to 1 September 2014 12:00:00:
 * const result = set(new Date(2014, 8, 1, 1, 23, 45), { hours: 12 })
 * //=> Mon Sep 01 2014 12:23:45
 */
export function set(date: Date, values: DateValues): Date;
/**
 * @summary Set date values to a given date.
 *
 * @description
 * Set date values to a given date.
 *
 * Sets fields on the date from object `values`. A value is not set if it is `undefined`, `null`,
 * or doesn't exist in `values`. Throws a `TypeError` if any of `hours`/`minutes`/`seconds`/
 * `milliseconds` is set and `date` is a `Temporal.PlainDate`, since plain dates have no time
 * component.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param values - The date values to be set
 *
 * @returns The new date with options set
 *
 * @example
 * // Transform 1 September 2014 into 20 October 2015 in a single line:
 * const result = set(new Date(2014, 8, 20), { year: 2015, month: 9, date: 20 })
 * //=> Tue Oct 20 2015 00:00:00
 *
 * @example
 * // Set 12 PM to 1 September 2014 01:23:45 to 1 September 2014 12:00:00:
 * const result = set(new Date(2014, 8, 1, 1, 23, 45), { hours: 12 })
 * //=> Mon Sep 01 2014 12:23:45
 */
export function set<T extends DateLike>(date: T, values: DateValues): T;
export function set(date: Date | DateLike, values: DateValues): Date | DateLike {
  if (date instanceof Date) {
    return withDate(date, (dateTime) => setValue(dateTime, values));
  }
  return setValue(date, values);
}
