import { addValue } from './add.js';
import { compare } from './helpers/compare.js';
import { type Duration, type FormatDurationUnit } from './format-duration.js';
import { type DateLike, type Interval } from './types.js';

function normalize<T extends Date | DateLike>(interval: Interval<T>): [T, T] {
  return compare(interval.start, interval.end) <= 0
    ? [interval.start, interval.end]
    : [interval.end, interval.start];
}

/**
 * @summary Count the number of whole `unit`s spanned by an interval, rounding up partial units.
 *
 * @description
 * Count the number of whole `unit`s spanned by an interval, rounding up partial units. Counts by
 * walking forward from `start` one `unit` at a time (the same calendar-aware step `addDays`/
 * `addMonths`/etc. use), so months/years/weeks are counted by real calendar boundary crossings
 * rather than an approximate fixed-length division — e.g. the number of months between January 31
 * and March 1 is correctly 2 (the second month is partial), not a division of elapsed milliseconds
 * by an average month length.
 *
 * @param interval - The interval to count
 * @param unit - The unit to count by
 *
 * @returns The number of whole `unit`s spanned by the interval, rounded up
 *
 * @example
 * countIntervalUnits(
 *   { start: new Date(2014, 0, 1), end: new Date(2014, 0, 10) },
 *   'days'
 * )
 * //=> 9
 *
 * @example
 * // The interval spans a partial second month, so it rounds up to 2.
 * countIntervalUnits(
 *   { start: new Date(2014, 0, 31), end: new Date(2014, 2, 1) },
 *   'months'
 * )
 * //=> 2
 */
export function countIntervalUnits(interval: Interval<Date>, unit: FormatDurationUnit): number;
/**
 * @summary Count the number of whole `unit`s spanned by an interval, rounding up partial units.
 *
 * @description
 * Count the number of whole `unit`s spanned by an interval, rounding up partial units. Counts by
 * walking forward from `start` one `unit` at a time (the same calendar-aware step `addDays`/
 * `addMonths`/etc. use), so months/years/weeks are counted by real calendar boundary crossings
 * rather than an approximate fixed-length division — e.g. the number of months between January 31
 * and March 1 is correctly 2 (the second month is partial), not a division of elapsed milliseconds
 * by an average month length.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `interval`.
 *
 * @param interval - The interval to count
 * @param unit - The unit to count by
 *
 * @returns The number of whole `unit`s spanned by the interval, rounded up
 *
 * @throws `TypeError` if `unit` is `'hours'`, `'minutes'`, or `'seconds'` and `interval`'s dates
 *   are `Temporal.PlainDate` (which has no time component)
 *
 * @example
 * countIntervalUnits(
 *   { start: new Date(2014, 0, 1), end: new Date(2014, 0, 10) },
 *   'days'
 * )
 * //=> 9
 *
 * @example
 * // The interval spans a partial second month, so it rounds up to 2.
 * countIntervalUnits(
 *   { start: new Date(2014, 0, 31), end: new Date(2014, 2, 1) },
 *   'months'
 * )
 * //=> 2
 */
export function countIntervalUnits<T extends DateLike>(
  interval: Interval<T>,
  unit: FormatDurationUnit
): number;
export function countIntervalUnits(
  interval: Interval<Date | DateLike>,
  unit: FormatDurationUnit
): number {
  const [start, end] = normalize(interval);
  if (compare(start, end) === 0) {
    return 0;
  }

  const step: Duration = { [unit]: 1 };
  let count = 0;
  let current = start;
  while (compare(current, end) < 0) {
    current = addValue(current, step);
    count++;
  }
  return count;
}
