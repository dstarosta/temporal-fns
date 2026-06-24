import { getCachedNumberFormat } from './helpers/intl-cache.js';

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
  locale?: Intl.LocalesArgument;
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

// Intl.NumberFormat's `unit` option wants the singular identifier ('year', not 'years').
const intlUnitByDurationUnit: Record<FormatDurationUnit, Intl.NumberFormatOptions['unit']> = {
  years: 'year',
  months: 'month',
  weeks: 'week',
  days: 'day',
  hours: 'hour',
  minutes: 'minute',
  seconds: 'second',
};

// Renders "<count> <unit>" via Intl.NumberFormat's `unit` style instead of a hardcoded per-unit
// word table: `style: 'unit'` natively pluralizes and genders the unit name correctly for any
// locale (including irregular plural systems like Russian's 1/2-4/5+ three-way split, or
// Arabic's zero-digit singular form), with zero bundled locale data. Uses .format() directly
// (not formatToParts) because Intl's own number/unit ordering and separator - including locales
// with no separator at all, like Japanese - is already correct; reconstructing it from parts
// would mean re-deciding that separator ourselves instead of using the one Intl already chose.
function formatUnit(unit: FormatDurationUnit, count: number, locale: Intl.LocalesArgument): string {
  return getCachedNumberFormat(locale, {
    style: 'unit',
    unit: intlUnitByDurationUnit[unit],
    unitDisplay: 'long',
  }).format(count);
}

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
  const locale = options?.locale;

  const parts: string[] = [];
  for (const unit of format) {
    const value = duration[unit];
    if (value !== undefined && (zero || value)) {
      parts.push(formatUnit(unit, value, locale));
    }
  }

  return parts.join(delimiter);
}
