import { addValue } from './add.js';
import { compare } from './helpers/compare.js';
import { type Duration } from './format-duration.js';
import { type DateLike, type Interval } from './types.js';

function normalize<T extends Date | DateLike>(interval: Interval<T>): [T, T] {
  return compare(interval.start, interval.end) <= 0
    ? [interval.start, interval.end]
    : [interval.end, interval.start];
}

/**
 * @summary Split an interval into consecutive chunks of the given duration.
 *
 * @description
 * Untyped variant of {@link splitIntervalByDuration} that accepts and returns the `Date |
 * DateLike` union directly, without the overloaded type narrowing.
 *
 * @param interval - The interval to split
 * @param duration - The size of each chunk
 *
 * @returns The interval split into consecutive `duration`-sized chunks
 *
 * @throws `RangeError` if `duration` doesn't represent a positive amount of time
 */
export function splitIntervalByDurationValue(
  interval: Interval<Date | DateLike>,
  duration: Duration
): Interval<Date | DateLike>[] {
  const [start, end] = normalize(interval);

  // addValue is a no-op for an all-zero/empty duration, which would loop forever below.
  const probe = addValue(start, duration);
  if (compare(probe, start) <= 0) {
    throw new RangeError('duration must represent a positive amount of time.');
  }

  const chunks: Interval<Date | DateLike>[] = [];
  let chunkStart = start;
  while (compare(chunkStart, end) < 0) {
    const chunkEnd = addValue(chunkStart, duration);
    const clampedEnd = compare(chunkEnd, end) < 0 ? chunkEnd : end;
    chunks.push({ start: chunkStart, end: clampedEnd });
    chunkStart = chunkEnd;
  }

  return chunks;
}

/**
 * @summary Split an interval into consecutive chunks of the given duration.
 *
 * @description
 * Split an interval into consecutive chunks of the given duration, walking forward from `start`.
 * The final chunk is truncated to `end` if the interval's length isn't an exact multiple of
 * `duration`. Returns an empty array if `interval.start` equals `interval.end`.
 *
 * @param interval - The interval to split
 * @param duration - The size of each chunk
 *
 * @returns The interval split into consecutive `duration`-sized chunks
 *
 * @throws `RangeError` if `duration` doesn't represent a positive amount of time
 *
 * @example
 * splitIntervalByDuration(
 *   { start: new Date(2014, 0, 1), end: new Date(2014, 0, 10) },
 *   { days: 3 }
 * )
 * //=> [
 * //   { start: Wed Jan 01 2014, end: Sat Jan 04 2014 },
 * //   { start: Sat Jan 04 2014, end: Tue Jan 07 2014 },
 * //   { start: Tue Jan 07 2014, end: Fri Jan 10 2014 }
 * // ]
 *
 * @example
 * // The final chunk is truncated when the length isn't an exact multiple of duration.
 * splitIntervalByDuration(
 *   { start: new Date(2014, 0, 1), end: new Date(2014, 0, 8) },
 *   { days: 3 }
 * )
 * //=> [
 * //   { start: Wed Jan 01 2014, end: Sat Jan 04 2014 },
 * //   { start: Sat Jan 04 2014, end: Tue Jan 07 2014 },
 * //   { start: Tue Jan 07 2014, end: Wed Jan 08 2014 }
 * // ]
 */
export function splitIntervalByDuration(
  interval: Interval<Date>,
  duration: Duration
): Interval<Date>[];
/**
 * @summary Split an interval into consecutive chunks of the given duration.
 *
 * @description
 * Split an interval into consecutive chunks of the given duration, walking forward from `start`.
 * The final chunk is truncated to `end` if the interval's length isn't an exact multiple of
 * `duration`. Returns an empty array if `interval.start` equals `interval.end`.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `interval`; the result has the same concrete type.
 *
 * @param interval - The interval to split
 * @param duration - The size of each chunk
 *
 * @returns The interval split into consecutive `duration`-sized chunks
 *
 * @throws `RangeError` if `duration` doesn't represent a positive amount of time
 *
 * @example
 * splitIntervalByDuration(
 *   { start: new Date(2014, 0, 1), end: new Date(2014, 0, 10) },
 *   { days: 3 }
 * )
 * //=> [
 * //   { start: Wed Jan 01 2014, end: Sat Jan 04 2014 },
 * //   { start: Sat Jan 04 2014, end: Tue Jan 07 2014 },
 * //   { start: Tue Jan 07 2014, end: Fri Jan 10 2014 }
 * // ]
 *
 * @example
 * // The final chunk is truncated when the length isn't an exact multiple of duration.
 * splitIntervalByDuration(
 *   { start: new Date(2014, 0, 1), end: new Date(2014, 0, 8) },
 *   { days: 3 }
 * )
 * //=> [
 * //   { start: Wed Jan 01 2014, end: Sat Jan 04 2014 },
 * //   { start: Sat Jan 04 2014, end: Tue Jan 07 2014 },
 * //   { start: Tue Jan 07 2014, end: Wed Jan 08 2014 }
 * // ]
 */
export function splitIntervalByDuration<T extends DateLike>(
  interval: Interval<T>,
  duration: Duration
): Interval<T>[];
export function splitIntervalByDuration(
  interval: Interval<Date | DateLike>,
  duration: Duration
): Interval<Date | DateLike>[] {
  return splitIntervalByDurationValue(interval, duration);
}
