import { withDate } from './helpers/convert.js';
import { getDateTimeFields } from './helpers/format-fields.js';
import { type RoundingMethod } from './round-to-nearest-hours.js';
import { type TimeLike } from './types.js';

/**
 * The {@link roundToNearestMinutes} function options.
 */
export interface RoundToNearestMinutesOptions {
  nearestTo?: number;
  roundingMethod?: RoundingMethod;
}

function roundedMinuteDelta(
  date: Date | TimeLike,
  options?: RoundToNearestMinutesOptions
): number | null {
  const nearestTo = options?.nearestTo ?? 1;
  if (nearestTo < 1 || nearestTo > 30) {
    return null;
  }

  const fields = getDateTimeFields(date);
  const fractionalMinutes = fields.minute + fields.second / 60 + fields.millisecond / 60_000;

  const method = options?.roundingMethod ?? 'round';
  const rounded = Math[method](fractionalMinutes / nearestTo) * nearestTo;
  return rounded - fields.minute;
}

function applyRoundedMinutes<T extends TimeLike>(dateTime: T, delta: number): T {
  const zeroed = dateTime.with({
    second: 0,
    millisecond: 0,
    microsecond: 0,
    nanosecond: 0,
  }) as T;
  return (delta === 0 ? zeroed : zeroed.add({ minutes: delta })) as T;
}

/**
 * @summary Rounds the given date to the nearest minute
 *
 * @description
 * Rounds the given date to the nearest minute (or number of minutes).
 * Rounds up when the given date is exactly between the nearest round minutes.
 *
 * @param date - The date to round
 * @param options - An object with options
 *
 * @returns The new date rounded to the closest minute
 *
 * @throws `RangeError` if `options.nearestTo` is not between 1 and 30 and `date` is a Temporal value
 *
 * @example
 * // Round 10 July 2014 12:12:34 to nearest minute:
 * const result = roundToNearestMinutes(new Date(2014, 6, 10, 12, 12, 34))
 * //=> Thu Jul 10 2014 12:13:00
 *
 * @example
 * // Round 10 July 2014 12:12:34 to nearest quarter hour:
 * const result = roundToNearestMinutes(new Date(2014, 6, 10, 12, 12, 34), { nearestTo: 15 })
 * //=> Thu Jul 10 2014 12:15:00
 *
 * @example
 * // Floor (rounds down) 10 July 2014 12:12:34 to nearest minute:
 * const result = roundToNearestMinutes(new Date(2014, 6, 10, 12, 12, 34), { roundingMethod: 'floor' })
 * //=> Thu Jul 10 2014 12:12:00
 *
 * @example
 * // Ceil (rounds up) 10 July 2014 12:12:34 to nearest half hour:
 * const result = roundToNearestMinutes(new Date(2014, 6, 10, 12, 12, 34), { roundingMethod: 'ceil', nearestTo: 30 })
 * //=> Thu Jul 10 2014 12:30:00
 */
export function roundToNearestMinutes(date: Date, options?: RoundToNearestMinutesOptions): Date;
/**
 * @summary Rounds the given date to the nearest minute
 *
 * @description
 * Rounds the given date to the nearest minute (or number of minutes).
 * Rounds up when the given date is exactly between the nearest round minutes.
 *
 * @typeParam T - A {@link TimeLike} type (`Temporal.PlainDateTime` or `Temporal.ZonedDateTime`).
 * Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to round
 * @param options - An object with options
 *
 * @returns The new date rounded to the closest minute
 *
 * @throws `RangeError` if `options.nearestTo` is not between 1 and 30 and `date` is a Temporal value
 *
 * @example
 * // Round 10 July 2014 12:12:34 to nearest minute:
 * const result = roundToNearestMinutes(new Date(2014, 6, 10, 12, 12, 34))
 * //=> Thu Jul 10 2014 12:13:00
 *
 * @example
 * // Round 10 July 2014 12:12:34 to nearest quarter hour:
 * const result = roundToNearestMinutes(new Date(2014, 6, 10, 12, 12, 34), { nearestTo: 15 })
 * //=> Thu Jul 10 2014 12:15:00
 *
 * @example
 * // Floor (rounds down) 10 July 2014 12:12:34 to nearest minute:
 * const result = roundToNearestMinutes(new Date(2014, 6, 10, 12, 12, 34), { roundingMethod: 'floor' })
 * //=> Thu Jul 10 2014 12:12:00
 *
 * @example
 * // Ceil (rounds up) 10 July 2014 12:12:34 to nearest half hour:
 * const result = roundToNearestMinutes(new Date(2014, 6, 10, 12, 12, 34), { roundingMethod: 'ceil', nearestTo: 30 })
 * //=> Thu Jul 10 2014 12:30:00
 */
export function roundToNearestMinutes<T extends TimeLike>(
  date: T,
  options?: RoundToNearestMinutesOptions
): T;
export function roundToNearestMinutes(
  date: Date | TimeLike,
  options?: RoundToNearestMinutesOptions
): Date | TimeLike {
  const delta = roundedMinuteDelta(date, options);

  if (delta === null) {
    if (date instanceof Date) {
      return new Date(Number.NaN);
    }
    throw new RangeError('roundToNearestMinutes: nearestTo must be between 1 and 30.');
  }

  if (date instanceof Date) {
    return withDate(date, (dateTime) => applyRoundedMinutes(dateTime, delta));
  }
  return applyRoundedMinutes(date, delta);
}
