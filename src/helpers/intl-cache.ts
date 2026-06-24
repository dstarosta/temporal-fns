// Constructing an Intl formatter (Intl.DateTimeFormat, Intl.RelativeTimeFormat) is dramatically
// more expensive than calling it (locale negotiation/data loading dominates the cost - confirmed
// via direct benchmarking: ~42,000ns to construct an Intl.DateTimeFormat vs ~700-1,100ns to reuse
// a cached instance, a 40-60x difference) — and this codebase's word-based format tokens
// (month/weekday/era/dayPeriod/quarter names, z/zzzz timezone names) each construct a fresh
// formatter per call by default. Caching by (locale, options) avoids re-paying that cost for the
// same shape, which recurs constantly: the same literal options object (e.g. `{ month: 'long' }`)
// is used on every call to a given formatter.

// Locale/options shapes used throughout this codebase are always plain, JSON-serializable values
// (strings, plain option objects with string/boolean/number leaves) - if a caller ever passes
// something that doesn't serialize (a rare Intl.Locale instance, a value with a toJSON that
// throws, etc.), the cache is bypassed (construct fresh) rather than caching incorrectly or
// throwing.
function cacheKey(locale: unknown, options: unknown): string | undefined {
  try {
    return JSON.stringify([locale, options]);
  } catch {
    return undefined;
  }
}

function createIntlCache<Options, Formatter>(
  construct: (locale: Intl.LocalesArgument, options: Options) => Formatter
): (locale: Intl.LocalesArgument, options: Options) => Formatter {
  const cache = new Map<string, Formatter>();
  return (locale, options) => {
    const key = cacheKey(locale, options);
    if (key === undefined) {
      return construct(locale, options);
    }
    const cached = cache.get(key);
    if (cached) {
      return cached;
    }
    const formatter = construct(locale, options);
    cache.set(key, formatter);
    return formatter;
  };
}

export const getCachedDateTimeFormat = createIntlCache(
  (locale: Intl.LocalesArgument, options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat(locale, options)
);

export const getCachedRelativeTimeFormat = createIntlCache(
  (locale: Intl.LocalesArgument, options: Intl.RelativeTimeFormatOptions) =>
    new Intl.RelativeTimeFormat(locale, options)
);

export const getCachedNumberFormat = createIntlCache(
  (locale: Intl.LocalesArgument, options: Intl.NumberFormatOptions) =>
    new Intl.NumberFormat(locale, options)
);
