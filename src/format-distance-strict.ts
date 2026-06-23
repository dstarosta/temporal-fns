import { compare } from './helpers/compare.js';
import { formatDistanceWords } from './helpers/format-distance-locale.js';
import { toDstNormalizedMilliseconds } from './helpers/to-dst-normalized-milliseconds.js';
import { toEpochMilliseconds } from './helpers/to-epoch-milliseconds.js';
import { type DateLike } from './types.js';

export type FormatDistanceStrictUnit = 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year';
export type FormatDistanceStrictRoundingMethod = 'floor' | 'ceil' | 'round';

/**
 * The {@link formatDistanceStrict} function options.
 */
export interface FormatDistanceStrictOptions {
  addSuffix?: boolean;
  unit?: FormatDistanceStrictUnit;
  roundingMethod?: FormatDistanceStrictRoundingMethod;
}

const minutesInDay = 1440;
const minutesInMonth = 43_200;
const minutesInYear = 525_600;

function round(method: FormatDistanceStrictRoundingMethod | undefined, value: number): number {
  const fn = Math[method ?? 'round'];
  const result = fn(value);
  return result === 0 ? 0 : result;
}

/**
 * @summary Return the distance between the given dates in words.
 *
 * @description
 * Return the distance between the given dates in words, using strict units.
 * This is like `formatDistance`, but does not use helpers like 'almost', 'over', 'less than' and
 * the like.
 *
 * Untyped variant of {@link formatDistanceStrict} that accepts the `Date | DateLike` union
 * directly, without the overloaded type narrowing.
 *
 * @param laterDate - The date
 * @param earlierDate - The date to compare with
 * @param options - An object with options
 *
 * @returns The distance in words
 */
export function formatDistanceStrictValue(
  laterDate: Date | DateLike,
  earlierDate: Date | DateLike,
  options?: FormatDistanceStrictOptions
): string {
  const comparison = compare(laterDate, earlierDate);

  const [orderedLater, orderedEarlier] =
    comparison > 0 ? [earlierDate, laterDate] : [laterDate, earlierDate];

  const localizeOptions = { addSuffix: options?.addSuffix, comparison };

  const milliseconds = toEpochMilliseconds(orderedEarlier) - toEpochMilliseconds(orderedLater);
  const minutes = milliseconds / 60_000;
  const dstNormalizedMinutes =
    (toDstNormalizedMilliseconds(orderedEarlier) - toDstNormalizedMilliseconds(orderedLater)) /
    60_000;

  let unit: FormatDistanceStrictUnit;
  if (options?.unit) {
    unit = options.unit;
  } else if (minutes < 1) {
    unit = 'second';
  } else if (minutes < 60) {
    unit = 'minute';
  } else if (minutes < minutesInDay) {
    unit = 'hour';
  } else if (dstNormalizedMinutes < minutesInMonth) {
    unit = 'day';
  } else if (dstNormalizedMinutes < minutesInYear) {
    unit = 'month';
  } else {
    unit = 'year';
  }

  if (unit === 'second') {
    const seconds = round(options?.roundingMethod, milliseconds / 1000);
    return formatDistanceWords('xSeconds', seconds, localizeOptions);
  }
  if (unit === 'minute') {
    const roundedMinutes = round(options?.roundingMethod, minutes);
    return formatDistanceWords('xMinutes', roundedMinutes, localizeOptions);
  }
  if (unit === 'hour') {
    const hours = round(options?.roundingMethod, minutes / 60);
    return formatDistanceWords('xHours', hours, localizeOptions);
  }
  if (unit === 'day') {
    const days = round(options?.roundingMethod, dstNormalizedMinutes / minutesInDay);
    return formatDistanceWords('xDays', days, localizeOptions);
  }
  if (unit === 'month') {
    const months = round(options?.roundingMethod, dstNormalizedMinutes / minutesInMonth);
    return months === 12 && options?.unit !== 'month'
      ? formatDistanceWords('xYears', 1, localizeOptions)
      : formatDistanceWords('xMonths', months, localizeOptions);
  }
  const years = round(options?.roundingMethod, dstNormalizedMinutes / minutesInYear);
  return formatDistanceWords('xYears', years, localizeOptions);
}

/**
 * @summary Return the distance between the given dates in words.
 *
 * @description
 * Return the distance between the given dates in words, using strict units.
 * This is like `formatDistance`, but does not use helpers like 'almost', 'over',
 * 'less than' and the like.
 *
 * | Distance between dates | Result              |
 * |--------------------------|---------------------|
 * | 0 ... 59 secs          | [0..59] seconds     |
 * | 1 ... 59 mins          | [1..59] minutes     |
 * | 1 ... 23 hrs           | [1..23] hours       |
 * | 1 ... 29 days          | [1..29] days        |
 * | 1 ... 11 months        | [1..11] months      |
 * | 1 ... N years          | [1..N]  years       |
 *
 * @param laterDate - The date
 * @param earlierDate - The date to compare with
 * @param options - An object with options
 *
 * @returns The distance in words
 *
 * @example
 * // What is the distance between 2 July 2014 and 1 January 2015?
 * const result = formatDistanceStrict(new Date(2014, 6, 2), new Date(2015, 0, 2))
 * //=> '6 months'
 *
 * @example
 * // What is the distance between 1 January 2015 00:00:15
 * // and 1 January 2015 00:00:00?
 * const result = formatDistanceStrict(
 *   new Date(2015, 0, 1, 0, 0, 15),
 *   new Date(2015, 0, 1, 0, 0, 0)
 * )
 * //=> '15 seconds'
 */
export function formatDistanceStrict(
  laterDate: Date,
  earlierDate: Date,
  options?: FormatDistanceStrictOptions
): string;
/**
 * @summary Return the distance between the given dates in words.
 *
 * @description
 * Return the distance between the given dates in words, using strict units.
 * This is like `formatDistance`, but does not use helpers like 'almost', 'over',
 * 'less than' and the like.
 *
 * | Distance between dates | Result              |
 * |--------------------------|---------------------|
 * | 0 ... 59 secs          | [0..59] seconds     |
 * | 1 ... 59 mins          | [1..59] minutes     |
 * | 1 ... 23 hrs           | [1..23] hours       |
 * | 1 ... 29 days          | [1..29] days        |
 * | 1 ... 11 months        | [1..11] months      |
 * | 1 ... N years          | [1..N]  years       |
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `laterDate`/`earlierDate`, which must share the same
 * concrete type.
 *
 * @param laterDate - The date
 * @param earlierDate - The date to compare with
 * @param options - An object with options
 *
 * @returns The distance in words
 *
 * @example
 * // What is the distance between 2 July 2014 and 1 January 2015?
 * const result = formatDistanceStrict(new Date(2014, 6, 2), new Date(2015, 0, 2))
 * //=> '6 months'
 *
 * @example
 * // What is the distance between 1 January 2015 00:00:15
 * // and 1 January 2015 00:00:00?
 * const result = formatDistanceStrict(
 *   new Date(2015, 0, 1, 0, 0, 15),
 *   new Date(2015, 0, 1, 0, 0, 0)
 * )
 * //=> '15 seconds'
 */
export function formatDistanceStrict<T extends DateLike>(
  laterDate: T,
  earlierDate: T,
  options?: FormatDistanceStrictOptions
): string;
export function formatDistanceStrict(
  laterDate: Date | DateLike,
  earlierDate: Date | DateLike,
  options?: FormatDistanceStrictOptions
): string {
  return formatDistanceStrictValue(laterDate, earlierDate, options);
}
