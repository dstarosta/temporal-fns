import { withDate } from './helpers/convert.js';
import { getDateTimeFields } from './helpers/format-fields.js';
import { type TimeLike } from './types.js';

export type RoundingMethod = 'ceil' | 'floor' | 'round' | 'trunc';

/**
 * The {@link roundToNearestHours} function options.
 */
export interface RoundToNearestHoursOptions {
  nearestTo?: number;
  roundingMethod?: RoundingMethod;
}

function roundedHourDelta(
  date: Date | TimeLike,
  options?: RoundToNearestHoursOptions
): number | null {
  const nearestTo = options?.nearestTo ?? 1;
  if (nearestTo < 1 || nearestTo > 12) {
    return null;
  }

  const fields = getDateTimeFields(date);
  const fractionalHours =
    fields.hour + fields.minute / 60 + fields.second / 3600 + fields.millisecond / 3_600_000;

  const method = options?.roundingMethod ?? 'round';
  const rounded = Math[method](fractionalHours / nearestTo) * nearestTo;
  return rounded - fields.hour;
}

function applyRoundedHours<T extends TimeLike>(dateTime: T, delta: number): T {
  const zeroed = dateTime.with({
    minute: 0,
    second: 0,
    millisecond: 0,
    microsecond: 0,
    nanosecond: 0,
  }) as T;
  return (delta === 0 ? zeroed : zeroed.add({ hours: delta })) as T;
}

/**
 * @summary Rounds the given date to the nearest hour
 *
 * @description
 * Rounds the given date to the nearest hour (or number of hours).
 * Rounds up when the given date is exactly between the nearest round hours.
 *
 * @param date - The date to round
 * @param options - An object with options
 *
 * @returns The new date rounded to the closest hour
 *
 * @throws `RangeError` if `options.nearestTo` is not between 1 and 12 and `date` is a Temporal value
 *
 * @example
 * // Round 10 July 2014 12:34:56 to nearest hour:
 * const result = roundToNearestHours(new Date(2014, 6, 10, 12, 34, 56))
 * //=> Thu Jul 10 2014 13:00:00
 *
 * @example
 * // Round 10 July 2014 12:34:56 to nearest half hour:
 * const result = roundToNearestHours(new Date(2014, 6, 10, 12, 34, 56), { nearestTo: 6 })
 * //=> Thu Jul 10 2014 12:00:00
 *
 * @example
 * // Round 10 July 2014 12:34:56 to nearest half hour:
 * const result = roundToNearestHours(new Date(2014, 6, 10, 12, 34, 56), { nearestTo: 8 })
 * //=> Thu Jul 10 2014 16:00:00
 *
 * @example
 * // Floor (rounds down) 10 July 2014 1:23:45 to nearest hour:
 * const result = roundToNearestHours(new Date(2014, 6, 10, 1, 23, 45), { roundingMethod: 'ceil' })
 * //=> Thu Jul 10 2014 02:00:00
 *
 * @example
 * // Ceil (rounds up) 10 July 2014 12:34:56 to nearest 8 hours:
 * const result = roundToNearestHours(new Date(2014, 6, 10, 12, 34, 56), { roundingMethod: 'floor', nearestTo: 8 })
 * //=> Thu Jul 10 2014 08:00:00
 */
export function roundToNearestHours(date: Date, options?: RoundToNearestHoursOptions): Date;
/**
 * @summary Rounds the given date to the nearest hour
 *
 * @description
 * Rounds the given date to the nearest hour (or number of hours).
 * Rounds up when the given date is exactly between the nearest round hours.
 *
 * @typeParam T - A {@link TimeLike} type (`Temporal.PlainDateTime` or `Temporal.ZonedDateTime`).
 * Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to round
 * @param options - An object with options
 *
 * @returns The new date rounded to the closest hour
 *
 * @throws `RangeError` if `options.nearestTo` is not between 1 and 12 and `date` is a Temporal value
 *
 * @example
 * // Round 10 July 2014 12:34:56 to nearest hour:
 * const result = roundToNearestHours(new Date(2014, 6, 10, 12, 34, 56))
 * //=> Thu Jul 10 2014 13:00:00
 *
 * @example
 * // Round 10 July 2014 12:34:56 to nearest half hour:
 * const result = roundToNearestHours(new Date(2014, 6, 10, 12, 34, 56), { nearestTo: 6 })
 * //=> Thu Jul 10 2014 12:00:00
 *
 * @example
 * // Round 10 July 2014 12:34:56 to nearest half hour:
 * const result = roundToNearestHours(new Date(2014, 6, 10, 12, 34, 56), { nearestTo: 8 })
 * //=> Thu Jul 10 2014 16:00:00
 *
 * @example
 * // Floor (rounds down) 10 July 2014 1:23:45 to nearest hour:
 * const result = roundToNearestHours(new Date(2014, 6, 10, 1, 23, 45), { roundingMethod: 'ceil' })
 * //=> Thu Jul 10 2014 02:00:00
 *
 * @example
 * // Ceil (rounds up) 10 July 2014 12:34:56 to nearest 8 hours:
 * const result = roundToNearestHours(new Date(2014, 6, 10, 12, 34, 56), { roundingMethod: 'floor', nearestTo: 8 })
 * //=> Thu Jul 10 2014 08:00:00
 */
export function roundToNearestHours<T extends TimeLike>(
  date: T,
  options?: RoundToNearestHoursOptions
): T;
export function roundToNearestHours(
  date: Date | TimeLike,
  options?: RoundToNearestHoursOptions
): Date | TimeLike {
  const delta = roundedHourDelta(date, options);

  if (delta === null) {
    if (date instanceof Date) {
      return new Date(Number.NaN);
    }
    throw new RangeError('roundToNearestHours: nearestTo must be between 1 and 12.');
  }

  if (date instanceof Date) {
    return withDate(date, (dateTime) => applyRoundedHours(dateTime, delta));
  }
  return applyRoundedHours(date, delta);
}
