import { getCachedDateTimeFormat } from './intl-cache.js';
import { type DateLike } from '../types.js';

// Intl.DateTimeFormat natively formats Date/PlainDate/PlainDateTime but rejects
// ZonedDateTime outright (it has no calendar-agnostic instant+timeZone pairing
// API of its own usable here) — so ZonedDateTime is converted to its Instant
// and the timeZone is passed explicitly to Intl.DateTimeFormat instead.
// PlainDate is widened to a midnight PlainDateTime: Intl rejects a PlainDate
// formatted with any time-related option (hour/dayPeriod/etc, used by the AM-
// PM and flexible-day-period formatters) since it genuinely has no time
// fields — the widened PlainDateTime produces identical output for the
// date-only fields (verified directly against V8) while also supporting
// time options.
function toFormattable(date: Date | DateLike): {
  value: Date | Temporal.PlainDateTime | Temporal.Instant;
  timeZone: string | undefined;
} {
  if (date instanceof Temporal.ZonedDateTime) {
    return { value: date.toInstant(), timeZone: date.timeZoneId };
  }
  if (date instanceof Temporal.PlainDate) {
    return { value: date.toPlainDateTime(), timeZone: undefined };
  }
  return { value: date, timeZone: undefined };
}

export function formatToParts(
  date: Date | DateLike,
  locale: Intl.LocalesArgument,
  options: Intl.DateTimeFormatOptions
): Intl.DateTimeFormatPart[] {
  const { value, timeZone } = toFormattable(date);
  // TypeScript 6.0's Intl.DateTimeFormat overloads don't yet resolve the
  // Temporal-accepting overload for a non-Date argument (a known lib-typing
  // gap, not a runtime issue — formatToParts genuinely accepts
  // PlainDate/PlainDateTime/Instant per the Temporal proposal's Intl
  // integration, verified directly against V8).
  return getCachedDateTimeFormat(locale, { ...options, timeZone }).formatToParts(
    value as unknown as Date
  );
}

// Same Date/PlainDate/PlainDateTime/ZonedDateTime handling as formatToParts, but returns the
// final formatted string directly (e.g. for dateStyle/timeStyle-based formatting) instead of
// parts - used by the P/p long-date/time tokens, which splice a single Intl-rendered string into
// the output rather than reading one specific part out of it.
export function formatWithIntl(
  date: Date | DateLike,
  locale: Intl.LocalesArgument,
  options: Intl.DateTimeFormatOptions
): string {
  const { value, timeZone } = toFormattable(date);
  // See the TypeScript-overload note on formatToParts above; the same gap applies here.
  return getCachedDateTimeFormat(locale, { ...options, timeZone }).format(value as unknown as Date);
}

export function getWordPart(
  date: Date | DateLike,
  locale: Intl.LocalesArgument,
  options: Intl.DateTimeFormatOptions,
  partType: Intl.DateTimeFormatPartTypes
): string {
  const parts = formatToParts(date, locale, options);
  // The requested partType is always present: it's derived directly from one
  // of the style options passed in (e.g. {weekday: 'long'} always yields a
  // 'weekday' part), so this fallback only satisfies noUncheckedIndexedAccess.
  /* v8 ignore next */
  return parts.find((part) => part.type === partType)?.value ?? '';
}
