import { getCachedDateTimeFormat } from './helpers/intl-cache.js';
import { type DateLike } from './types.js';

/**
 * The {@link intlFormat} function locale options.
 */
export interface IntlFormatLocaleOptions {
  locale: Intl.LocalesArgument;
}

function isFormatOptions(
  options: Intl.DateTimeFormatOptions | IntlFormatLocaleOptions | undefined
): options is Intl.DateTimeFormatOptions {
  return options !== undefined && !('locale' in options);
}

// Every Temporal type (including ZonedDateTime, using its own zone
// automatically) has a locale-aware .toLocaleString() — part of the Temporal
// proposal's Intl integration — equivalent to
// `new Intl.DateTimeFormat(locale, options).format(value)`, and with the same
// no-options defaults. This sidesteps Intl.DateTimeFormat.format() rejecting
// ZonedDateTime values outright. Date.prototype.toLocaleString() is NOT used
// for the Date branch below, despite the analogous name: with no options it
// defaults to including the time of day, while Intl.DateTimeFormat (which
// date-fns' intlFormat uses internally) defaults to date-only — so the Date
// branch goes through Intl.DateTimeFormat directly to match date-fns exactly.
/**
 * @summary Format the date with `Intl.DateTimeFormat`.
 *
 * @description
 * Return the formatted date string in the given format.
 * The method uses [`Intl.DateTimeFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat) inside.
 * formatOptions are the same as [`Intl.DateTimeFormat` options](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat#using_options).
 *
 * @param date - The date to format
 *
 * @returns The formatted date string
 *
 * @example
 * // Represent 4 October 2019 in middle-endian format:
 * const result = intlFormat(new Date(2019, 9, 4, 12, 30, 13, 456))
 * //=> 10/4/2019
 */
export function intlFormat(date: Date | DateLike): string;
export function intlFormat(date: Date | DateLike, localeOptions: IntlFormatLocaleOptions): string;
export function intlFormat(
  date: Date | DateLike,
  formatOptions: Intl.DateTimeFormatOptions
): string;
export function intlFormat(
  date: Date | DateLike,
  formatOptions: Intl.DateTimeFormatOptions,
  localeOptions: IntlFormatLocaleOptions
): string;
export function intlFormat(
  date: Date | DateLike,
  formatOrLocale?: Intl.DateTimeFormatOptions | IntlFormatLocaleOptions,
  localeOptions?: IntlFormatLocaleOptions
): string {
  let formatOptions: Intl.DateTimeFormatOptions | undefined;
  let locale: Intl.LocalesArgument | undefined;

  if (isFormatOptions(formatOrLocale)) {
    formatOptions = formatOrLocale;
    locale = localeOptions?.locale;
  } else {
    locale = formatOrLocale?.locale;
  }

  if (date instanceof Date) {
    return getCachedDateTimeFormat(locale, formatOptions ?? {}).format(date);
  }
  return date.toLocaleString(locale, formatOptions);
}
