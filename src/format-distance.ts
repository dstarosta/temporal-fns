import { compare } from './helpers/compare.js';
import { differenceInMonthsValue } from './helpers/create-difference-in-date-unit.js';
import { formatRelativeUnit } from './helpers/format-distance-locale.js';
import { toDstNormalizedMilliseconds } from './helpers/to-dst-normalized-milliseconds.js';
import { toEpochMilliseconds } from './helpers/to-epoch-milliseconds.js';
import { type DateLike } from './types.js';

/**
 * The {@link formatDistance} function options.
 */
export interface FormatDistanceOptions {
  includeSeconds?: boolean;
  addSuffix?: boolean;
  locale?: Intl.LocalesArgument;
}

const minutesInDay = 1440;
const minutesInMonth = 43_200;
const minutesInAlmostTwoDays = 2520;

/**
 * @summary Return the distance between the given dates in words.
 *
 * @description
 * Return the distance between the given dates in words.
 *
 * Untyped variant of {@link formatDistance} that accepts the `Date | DateLike` union directly,
 * without the overloaded type narrowing.
 *
 * @param laterDate - The date
 * @param earlierDate - The date to compare with
 * @param options - An object with options
 *
 * @returns The distance in words
 */
export function formatDistanceValue(
  laterDate: Date | DateLike,
  earlierDate: Date | DateLike,
  options?: FormatDistanceOptions
): string {
  const comparison = compare(laterDate, earlierDate);

  const [orderedLater, orderedEarlier] =
    comparison > 0 ? [earlierDate, laterDate] : [laterDate, earlierDate];

  const localizeOptions = { addSuffix: options?.addSuffix, comparison, locale: options?.locale };

  const seconds = Math.round(
    (toEpochMilliseconds(orderedEarlier) - toEpochMilliseconds(orderedLater)) / 1000
  );
  // Equivalent to date-fns' `seconds - offsetInSeconds`: the DST/timezone
  // offset terms cancel the real-elapsed-time terms, leaving exactly the
  // DST-normalized millisecond difference — see toDstNormalizedMilliseconds.
  const minutes = Math.round(
    (toDstNormalizedMilliseconds(orderedEarlier) - toDstNormalizedMilliseconds(orderedLater)) /
      60_000
  );

  // The bucket boundaries below are unchanged from date-fns' own thresholds (correct,
  // locale-independent math). Only the rendering changed: date-fns layers qualifier words
  // ("about", "less than", "half a", "over", "almost") on top of these buckets via per-locale
  // word tables; this renders a plain count instead (see formatRelativeUnit's own comment for
  // why), so several previously textually-distinct buckets now render identically (e.g. "about
  // 1 year"/"over 1 year"/"almost 2 years" all become a plain year count).
  if (minutes < 2) {
    if (options?.includeSeconds) {
      if (seconds < 5) {
        return formatRelativeUnit('second', 5, localizeOptions);
      }
      if (seconds < 10) {
        return formatRelativeUnit('second', 10, localizeOptions);
      }
      if (seconds < 20) {
        return formatRelativeUnit('second', 20, localizeOptions);
      }
      if (seconds < 40) {
        return formatRelativeUnit('second', 30, localizeOptions);
      }
      if (seconds < 60) {
        return formatRelativeUnit('minute', 1, localizeOptions);
      }
      return formatRelativeUnit('minute', 1, localizeOptions);
    }
    if (minutes === 0) {
      return formatRelativeUnit('minute', 1, localizeOptions);
    }
    return formatRelativeUnit('minute', minutes, localizeOptions);
  }

  if (minutes < 45) {
    return formatRelativeUnit('minute', minutes, localizeOptions);
  }
  if (minutes < 90) {
    return formatRelativeUnit('hour', 1, localizeOptions);
  }
  if (minutes < minutesInDay) {
    const hours = Math.round(minutes / 60);
    return formatRelativeUnit('hour', hours, localizeOptions);
  }
  if (minutes < minutesInAlmostTwoDays) {
    return formatRelativeUnit('day', 1, localizeOptions);
  }
  if (minutes < minutesInMonth) {
    const days = Math.round(minutes / minutesInDay);
    return formatRelativeUnit('day', days, localizeOptions);
  }
  if (minutes < minutesInMonth * 2) {
    const months = Math.round(minutes / minutesInMonth);
    return formatRelativeUnit('month', months, localizeOptions);
  }

  const months = differenceInMonthsValue(orderedEarlier, orderedLater);

  if (months < 12) {
    const nearestMonth = Math.round(minutes / minutesInMonth);
    return formatRelativeUnit('month', nearestMonth, localizeOptions);
  }

  const monthsSinceStartOfYear = months % 12;
  const years = Math.trunc(months / 12);

  if (monthsSinceStartOfYear < 3) {
    return formatRelativeUnit('year', years, localizeOptions);
  }
  if (monthsSinceStartOfYear < 9) {
    return formatRelativeUnit('year', years, localizeOptions);
  }
  return formatRelativeUnit('year', years + 1, localizeOptions);
}

/**
 * @summary Return the distance between the given dates in words.
 *
 * @description
 * Return the distance between the given dates in words.
 *
 * | Distance between dates                                            | Result              |
 * |-------------------------------------------------------------------|---------------------|
 * | 0 ... 30 secs                                                     | less than a minute  |
 * | 30 secs ... 1 min 30 secs                                         | 1 minute            |
 * | 1 min 30 secs ... 44 mins 30 secs                                 | [2..44] minutes     |
 * | 44 mins ... 30 secs ... 89 mins 30 secs                           | about 1 hour        |
 * | 89 mins 30 secs ... 23 hrs 59 mins 30 secs                        | about [2..24] hours |
 * | 23 hrs 59 mins 30 secs ... 41 hrs 59 mins 30 secs                 | 1 day               |
 * | 41 hrs 59 mins 30 secs ... 29 days 23 hrs 59 mins 30 secs         | [2..30] days        |
 * | 29 days 23 hrs 59 mins 30 secs ... 44 days 23 hrs 59 mins 30 secs | about 1 month       |
 * | 44 days 23 hrs 59 mins 30 secs ... 59 days 23 hrs 59 mins 30 secs | about 2 months      |
 * | 59 days 23 hrs 59 mins 30 secs ... 1 yr                           | [2..12] months      |
 * | 1 yr ... 1 yr 3 months                                            | about 1 year        |
 * | 1 yr 3 months ... 1 yr 9 months                                   | over 1 year         |
 * | 1 yr 9 months ... 2 yrs                                           | almost 2 years      |
 * | N yrs ... N yrs 3 months                                          | about N years       |
 * | N yrs 3 months ... N yrs 9 months                                 | over N years        |
 * | N yrs 9 months ... N+1 yrs                                        | almost N+1 years    |
 *
 * With `options.includeSeconds == true`:
 * | Distance between dates | Result               |
 * |------------------------|----------------------|
 * | 0 secs ... 5 secs      | less than 5 seconds  |
 * | 5 secs ... 10 secs     | less than 10 seconds |
 * | 10 secs ... 20 secs    | less than 20 seconds |
 * | 20 secs ... 40 secs    | half a minute        |
 * | 40 secs ... 60 secs    | less than a minute   |
 * | 60 secs ... 90 secs    | 1 minute             |
 *
 * @param laterDate - The date
 * @param earlierDate - The date to compare with
 * @param options - An object with options
 *
 * @returns The distance in words
 *
 * @example
 * // What is the distance between 2 July 2014 and 1 January 2015?
 * const result = formatDistance(new Date(2014, 6, 2), new Date(2015, 0, 1))
 * //=> '6 months'
 *
 * @example
 * // What is the distance between 1 January 2015 00:00:15
 * // and 1 January 2015 00:00:00, including seconds?
 * const result = formatDistance(
 *   new Date(2015, 0, 1, 0, 0, 15),
 *   new Date(2015, 0, 1, 0, 0, 0),
 *   { includeSeconds: true }
 * )
 * //=> 'less than 20 seconds'
 *
 * @example
 * // What is the distance from 1 January 2016
 * // to 1 January 2015, with a suffix?
 * const result = formatDistance(new Date(2015, 0, 1), new Date(2016, 0, 1), {
 *   addSuffix: true
 * })
 * //=> 'about 1 year ago'
 */
export function formatDistance(
  laterDate: Date,
  earlierDate: Date,
  options?: FormatDistanceOptions
): string;
/**
 * @summary Return the distance between the given dates in words.
 *
 * @description
 * Return the distance between the given dates in words.
 *
 * | Distance between dates                                            | Result              |
 * |-------------------------------------------------------------------|---------------------|
 * | 0 ... 30 secs                                                     | less than a minute  |
 * | 30 secs ... 1 min 30 secs                                         | 1 minute            |
 * | 1 min 30 secs ... 44 mins 30 secs                                 | [2..44] minutes     |
 * | 44 mins ... 30 secs ... 89 mins 30 secs                           | about 1 hour        |
 * | 89 mins 30 secs ... 23 hrs 59 mins 30 secs                        | about [2..24] hours |
 * | 23 hrs 59 mins 30 secs ... 41 hrs 59 mins 30 secs                 | 1 day               |
 * | 41 hrs 59 mins 30 secs ... 29 days 23 hrs 59 mins 30 secs         | [2..30] days        |
 * | 29 days 23 hrs 59 mins 30 secs ... 44 days 23 hrs 59 mins 30 secs | about 1 month       |
 * | 44 days 23 hrs 59 mins 30 secs ... 59 days 23 hrs 59 mins 30 secs | about 2 months      |
 * | 59 days 23 hrs 59 mins 30 secs ... 1 yr                           | [2..12] months      |
 * | 1 yr ... 1 yr 3 months                                            | about 1 year        |
 * | 1 yr 3 months ... 1 yr 9 months                                   | over 1 year         |
 * | 1 yr 9 months ... 2 yrs                                           | almost 2 years      |
 * | N yrs ... N yrs 3 months                                          | about N years       |
 * | N yrs 3 months ... N yrs 9 months                                 | over N years        |
 * | N yrs 9 months ... N+1 yrs                                        | almost N+1 years    |
 *
 * With `options.includeSeconds == true`:
 * | Distance between dates | Result               |
 * |------------------------|----------------------|
 * | 0 secs ... 5 secs      | less than 5 seconds  |
 * | 5 secs ... 10 secs     | less than 10 seconds |
 * | 10 secs ... 20 secs    | less than 20 seconds |
 * | 20 secs ... 40 secs    | half a minute        |
 * | 40 secs ... 60 secs    | less than a minute   |
 * | 60 secs ... 90 secs    | 1 minute             |
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
 * const result = formatDistance(new Date(2014, 6, 2), new Date(2015, 0, 1))
 * //=> '6 months'
 *
 * @example
 * // What is the distance between 1 January 2015 00:00:15
 * // and 1 January 2015 00:00:00, including seconds?
 * const result = formatDistance(
 *   new Date(2015, 0, 1, 0, 0, 15),
 *   new Date(2015, 0, 1, 0, 0, 0),
 *   { includeSeconds: true }
 * )
 * //=> 'less than 20 seconds'
 *
 * @example
 * // What is the distance from 1 January 2016
 * // to 1 January 2015, with a suffix?
 * const result = formatDistance(new Date(2015, 0, 1), new Date(2016, 0, 1), {
 *   addSuffix: true
 * })
 * //=> 'about 1 year ago'
 */
export function formatDistance<T extends DateLike>(
  laterDate: T,
  earlierDate: T,
  options?: FormatDistanceOptions
): string;
export function formatDistance(
  laterDate: Date | DateLike,
  earlierDate: Date | DateLike,
  options?: FormatDistanceOptions
): string {
  return formatDistanceValue(laterDate, earlierDate, options);
}
