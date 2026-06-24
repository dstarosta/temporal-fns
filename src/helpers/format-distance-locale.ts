import { getCachedNumberFormat, getCachedRelativeTimeFormat } from './intl-cache.js';

export type RelativeUnit = 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';

export interface FormatDistanceLocaleOptions {
  addSuffix?: boolean | undefined;
  comparison?: number | undefined;
  locale?: Intl.LocalesArgument;
}

// Renders "<count> <unit>" (or, with addSuffix, "<count> <unit> ago"/"in <count> <unit>") via
// Intl.RelativeTimeFormat/Intl.NumberFormat instead of a hardcoded English word table. This is a
// deliberate divergence from date-fns: date-fns' formatDistance also layers qualifier words
// ("about", "less than", "almost", "over") on top of the count, via per-locale Locale objects
// with bundled grammar data for each one - there's no Intl primitive for those, so rather than
// hardcode English qualifiers and silently produce broken output for every other locale, this
// drops the qualifier distinction entirely and renders a plain count, correctly localized for
// any locale (including English, where the output also changes).
//
// addSuffix=false uses Intl.NumberFormat (matches formatDuration's approach: correct
// pluralization with zero bundled data). addSuffix=true uses Intl.RelativeTimeFormat with
// `numeric: 'always'` (not 'auto', which would substitute idiomatic phrases like "yesterday" or
// "last year" - this needs a plain "N units ago"/"in N units" shape instead).
export function formatRelativeUnit(
  unit: RelativeUnit,
  count: number,
  options?: FormatDistanceLocaleOptions
): string {
  if (options?.addSuffix) {
    const signedCount = options.comparison && options.comparison > 0 ? count : -count;
    return getCachedRelativeTimeFormat(options.locale, { numeric: 'always' }).format(
      signedCount,
      unit
    );
  }
  return getCachedNumberFormat(options?.locale, {
    style: 'unit',
    unit,
    unitDisplay: 'long',
  }).format(count);
}
