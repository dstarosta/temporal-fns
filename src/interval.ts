import { compare } from './helpers/compare.js';
import { type DateLike, type Interval as IntervalType } from './types.js';

/**
 * The {@link interval} function options.
 */
export interface IntervalOptions {
  assertPositive?: boolean;
}

/**
 * @summary Creates an interval object and validates its values.
 *
 * @description
 * Creates a normalized interval object and validates its values. If `options.assertPositive` is
 * set and `end` is before `start`, an exception is thrown.
 *
 * @param start - The start of the interval.
 * @param end - The end of the interval.
 * @param options - The options object.
 *
 * @throws `End date must be after start date` when `end` is before `start` and
 * `options.assertPositive` is true.
 *
 * @returns The normalized and validated interval object.
 */
export function interval(start: Date, end: Date, options?: IntervalOptions): IntervalType<Date>;
/**
 * @summary Creates an interval object and validates its values.
 *
 * @description
 * Creates a normalized interval object and validates its values. If `options.assertPositive` is
 * set and `end` is before `start`, an exception is thrown.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `start`/`end`; both arguments must share the same
 * concrete type, and the result has that same type.
 *
 * @param start - The start of the interval.
 * @param end - The end of the interval.
 * @param options - The options object.
 *
 * @throws `End date must be after start date` when `end` is before `start` and
 * `options.assertPositive` is true.
 *
 * @returns The normalized and validated interval object.
 */
export function interval<T extends DateLike>(
  start: T,
  end: T,
  options?: IntervalOptions
): IntervalType<T>;
export function interval(
  start: Date | DateLike,
  end: Date | DateLike,
  options?: IntervalOptions
): IntervalType<Date | DateLike> {
  if (options?.assertPositive && compare(start, end) > 0) {
    throw new TypeError('End date must be after start date');
  }
  return { start, end };
}
