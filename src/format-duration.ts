import { type FormatDistanceToken, formatDistanceWords } from './helpers/format-distance-locale.js';

/**
 * An object that represents a duration in years, months, weeks, days, hours, minutes and seconds.
 */
export interface Duration {
  years?: number;
  months?: number;
  weeks?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

export type FormatDurationUnit = keyof Duration;

/**
 * The {@link formatDuration} function options.
 */
export interface FormatDurationOptions {
  format?: FormatDurationUnit[];
  zero?: boolean;
  delimiter?: string;
}

const defaultFormat: FormatDurationUnit[] = [
  'years',
  'months',
  'weeks',
  'days',
  'hours',
  'minutes',
  'seconds',
];

const tokenByUnit: Record<FormatDurationUnit, FormatDistanceToken> = {
  years: 'xYears',
  months: 'xMonths',
  weeks: 'xWeeks',
  days: 'xDays',
  hours: 'xHours',
  minutes: 'xMinutes',
  seconds: 'xSeconds',
};

/**
 * @summary Formats a duration in human-readable format
 *
 * @description
 * Return human-readable duration string i.e. "9 months 2 days"
 *
 * @param duration - The duration to format
 * @param options - An object with options
 *
 * @returns The formatted date string
 *
 * @example
 * // Format full duration
 * formatDuration({
 *   years: 2,
 *   months: 9,
 *   weeks: 1,
 *   days: 7,
 *   hours: 5,
 *   minutes: 9,
 *   seconds: 30
 * })
 * //=> '2 years 9 months 1 week 7 days 5 hours 9 minutes 30 seconds'
 *
 * @example
 * // Format partial duration
 * formatDuration({ months: 9, days: 2 })
 * //=> '9 months 2 days'
 *
 * @example
 * // Customize the format
 * formatDuration(
 *   {
 *     years: 2,
 *     months: 9,
 *     weeks: 1,
 *     days: 7,
 *     hours: 5,
 *     minutes: 9,
 *     seconds: 30
 *   },
 *   { format: ['months', 'weeks'] }
 * ) === '9 months 1 week'
 *
 * @example
 * // Customize the zeros presence
 * formatDuration({ years: 0, months: 9 })
 * //=> '9 months'
 * formatDuration({ years: 0, months: 9 }, { zero: true })
 * //=> '0 years 9 months'
 *
 * @example
 * // Customize the delimiter
 * formatDuration({ years: 2, months: 9, weeks: 3 }, { delimiter: ', ' })
 * //=> '2 years, 9 months, 3 weeks'
 */
export function formatDuration(duration: Duration, options?: FormatDurationOptions): string {
  const format = options?.format ?? defaultFormat;
  const zero = options?.zero ?? false;
  const delimiter = options?.delimiter ?? ' ';

  const parts: string[] = [];
  for (const unit of format) {
    const value = duration[unit];
    if (value !== undefined && (zero || value)) {
      parts.push(formatDistanceWords(tokenByUnit[unit], value));
    }
  }

  return parts.join(delimiter);
}
