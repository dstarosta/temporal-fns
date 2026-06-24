import { describe, expect, it } from 'vitest';
import { formatRelative as dateFnsFormatRelative } from 'date-fns';
import { formatRelative } from '../src/format-relative.js';
import { toPlainDate, toPlainDateTime, toZonedDateTime } from './helpers/fixtures.js';

// formatRelative deliberately diverges from date-fns: date-fns names the specific weekday and
// includes a time-of-day ("last Thursday at 12:45 AM"), via per-locale Locale objects with
// bundled connector-word data ("last", "at") for every supported language. There's no Intl
// primitive that provides that same weekday+time composite in an arbitrary locale - passing a
// non-English locale into a literal-string template like that would produce garbled output
// ('last' jueves 'at' 12:45 is not valid Spanish). temporal-fns resolves to
// Intl.RelativeTimeFormat's day/week granularity instead, with no time-of-day component, for
// every locale including English - correctly localized everywhere, at the cost of losing the
// specific weekday name and time.
describe('formatRelative', () => {
  const base = new Date(2014, 1, 11, 14, 5, 8);

  it('real date-fns names the specific weekday and includes a time-of-day', () => {
    const date = new Date(base);
    date.setDate(date.getDate() - 6);
    expect(dateFnsFormatRelative(date, base)).toBe('last Wednesday at 2:05 PM');
  });

  // The 'other' bucket (beyond +/-6 days) falls back to format(date, 'P', options), which itself
  // deliberately diverges from date-fns' own 'P' token (see format.test.ts's P/p divergence
  // tests) - Intl.DateTimeFormat's 'short' dateStyle, not date-fns' fixed MM/dd/yyyy pattern.
  const dayOffsetExpectations: [number, string][] = [
    [-10, '2/1/14'],
    [-7, '2/4/14'],
    [-6, 'last week'],
    [-5, 'last week'],
    [-2, 'last week'],
    [-1, 'yesterday'],
    [0, 'today'],
    [1, 'tomorrow'],
    [2, 'next week'],
    [6, 'next week'],
    [7, '2/18/14'],
    [10, '2/21/14'],
  ];

  for (const [dayOffset, expected] of dayOffsetExpectations) {
    it(`resolves day offset ${String(dayOffset)} to "${expected}" (token boundary coverage)`, () => {
      const date = new Date(base);
      date.setDate(date.getDate() + dayOffset);
      expect(formatRelative(date, base)).toBe(expected);
    });
  }

  it('is correctly localized for a non-English locale, unlike a literal-string template would be', () => {
    const lastWeek = new Date(base);
    lastWeek.setDate(lastWeek.getDate() - 3);
    expect(formatRelative(lastWeek, base, { locale: 'es' })).toBe('la semana pasada');

    const nextWeek = new Date(base);
    nextWeek.setDate(nextWeek.getDate() + 3);
    expect(formatRelative(nextWeek, base, { locale: 'fr-FR' })).toBe('la semaine prochaine');

    const yesterday = new Date(base);
    yesterday.setDate(yesterday.getDate() - 1);
    expect(formatRelative(yesterday, base, { locale: 'ru' })).toBe('вчера');
  });

  it('resolves to the same instant (today token)', () => {
    expect(formatRelative(base, base)).toBe('today');
  });

  it('throws RangeError for an invalid date, matching date-fns', () => {
    const invalid = new Date(Number.NaN);
    expect(() => formatRelative(invalid, base)).toThrow(RangeError);
    expect(() => dateFnsFormatRelative(invalid, base)).toThrow(RangeError);
  });

  it('works for ZonedDateTime input', () => {
    const date = new Date(base);
    date.setDate(date.getDate() + 3);
    expect(formatRelative(toZonedDateTime(date), toZonedDateTime(base))).toBe('next week');
  });

  it('works for PlainDateTime input', () => {
    const date = new Date(base);
    date.setDate(date.getDate() + 3);
    expect(formatRelative(toPlainDateTime(date), toPlainDateTime(base))).toBe('next week');
  });

  it('works for PlainDate input', () => {
    const date = new Date(base);
    date.setDate(date.getDate() + 3);
    expect(formatRelative(toPlainDate(date), toPlainDate(base))).toBe('next week');
  });

  it('works for PlainDate input across all token boundaries', () => {
    for (const [dayOffset, expected] of dayOffsetExpectations) {
      const date = new Date(base);
      date.setDate(date.getDate() + dayOffset);
      expect(formatRelative(toPlainDate(date), toPlainDate(base))).toBe(expected);
    }
  });
});
