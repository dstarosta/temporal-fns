import { describe, expect, it } from 'vitest';
import { formatDistance as dateFnsFormatDistance } from 'date-fns';
import { es, ru } from 'date-fns/locale';
import { formatDistance } from '../src/format-distance.js';
import { toPlainDate, toPlainDateTime, toUTCDate, toZonedDateTime } from './helpers/fixtures.js';

// formatDistance deliberately diverges from date-fns: date-fns layers qualifier words ("about",
// "less than", "almost", "over", "half a") on top of a plain count, via per-locale Locale
// objects with bundled grammar data for each one. There's no Intl primitive for these
// qualifiers, so rather than hardcode English words and silently produce broken output for
// every other locale, this renders a plain count via Intl.NumberFormat/Intl.RelativeTimeFormat
// instead - correctly localized everywhere (including English, where the output also changes),
// at the cost of losing the approximation nuance. The bucket boundaries themselves (which
// magnitude maps to which unit) are unchanged from date-fns' own thresholds.
describe('formatDistance', () => {
  const base = new Date(2015, 0, 1, 0, 0, 0);

  it('date-fns uses qualifier words this no longer replicates', () => {
    expect(dateFnsFormatDistance(new Date(2015, 0, 1, 0, 0, 10), base)).toBe('less than a minute');
    expect(dateFnsFormatDistance(new Date(2015, 0, 1, 1, 30, 0), base)).toBe('about 2 hours');
    expect(dateFnsFormatDistance(new Date(2016, 0, 1), base)).toBe('about 1 year');
    expect(dateFnsFormatDistance(new Date(2016, 5, 1), base)).toBe('over 1 year');
    expect(dateFnsFormatDistance(new Date(2016, 10, 1), base)).toBe('almost 2 years');
  });

  const cases: { label: string; date: Date; expected: string }[] = [
    { label: '10 secs', date: new Date(2015, 0, 1, 0, 0, 10), expected: '1 minute' },
    { label: '29 secs', date: new Date(2015, 0, 1, 0, 0, 29), expected: '1 minute' },
    { label: '35 secs', date: new Date(2015, 0, 1, 0, 0, 35), expected: '1 minute' },
    { label: '50 secs', date: new Date(2015, 0, 1, 0, 0, 50), expected: '1 minute' },
    { label: '5 mins', date: new Date(2015, 0, 1, 0, 5, 0), expected: '5 minutes' },
    { label: '44 mins', date: new Date(2015, 0, 1, 0, 44, 0), expected: '44 minutes' },
    { label: '60 mins', date: new Date(2015, 0, 1, 1, 0, 0), expected: '1 hour' },
    { label: '90 mins', date: new Date(2015, 0, 1, 1, 30, 0), expected: '2 hours' },
    { label: '5 hours', date: new Date(2015, 0, 1, 5, 0, 0), expected: '5 hours' },
    { label: '23.5 hours', date: new Date(2015, 0, 1, 23, 30, 0), expected: '24 hours' },
    {
      label: '30 hours (rounds to 1 day)',
      date: new Date(2015, 0, 2, 6, 0, 0),
      expected: '1 day',
    },
    { label: '2 days', date: new Date(2015, 0, 3, 0, 0, 0), expected: '2 days' },
    { label: '15 days', date: new Date(2015, 0, 16, 0, 0, 0), expected: '15 days' },
    { label: '45 days', date: new Date(2015, 1, 15, 0, 0, 0), expected: '2 months' },
    { label: '6 months', date: new Date(2015, 6, 1, 0, 0, 0), expected: '6 months' },
    { label: '1 year', date: new Date(2016, 0, 1, 0, 0, 0), expected: '1 year' },
    { label: '1 year 2 months', date: new Date(2016, 2, 1, 0, 0, 0), expected: '1 year' },
    { label: '1 year 5 months', date: new Date(2016, 5, 1, 0, 0, 0), expected: '1 year' },
    { label: '1 year 10 months', date: new Date(2016, 10, 1, 0, 0, 0), expected: '2 years' },
    { label: '5 years', date: new Date(2020, 0, 1, 0, 0, 0), expected: '5 years' },
  ];

  for (const { label, date, expected } of cases) {
    it(`renders "${expected}" (${label})`, () => {
      expect(formatDistance(date, base)).toBe(expected);
    });
    it(`renders "${expected}" reversed (${label})`, () => {
      expect(formatDistance(base, date)).toBe(expected);
    });
  }

  it('renders addSuffix with Intl.RelativeTimeFormat, future and past', () => {
    const date = new Date(2015, 6, 1);
    expect(formatDistance(date, base, { addSuffix: true })).toBe('in 6 months');
    expect(formatDistance(base, date, { addSuffix: true })).toBe('6 months ago');
  });

  it('is correctly localized, unlike a hardcoded English qualifier word would be', () => {
    const date = new Date(2015, 6, 1);
    expect(formatDistance(date, base, { locale: 'es' })).toBe(
      dateFnsFormatDistance(date, base, { locale: es }).replace('alrededor de ', '')
    );
    expect(formatDistance(date, base, { addSuffix: true, locale: 'ru' })).toBe(
      dateFnsFormatDistance(date, base, { addSuffix: true, locale: ru })
    );
  });

  it('renders a plain count for every includeSeconds sub-minute bucket (drops "less than"/"half a")', () => {
    expect(formatDistance(new Date(2015, 0, 1, 0, 0, 3), base, { includeSeconds: true })).toBe(
      '5 seconds'
    );
    expect(formatDistance(new Date(2015, 0, 1, 0, 0, 8), base, { includeSeconds: true })).toBe(
      '10 seconds'
    );
    expect(formatDistance(new Date(2015, 0, 1, 0, 0, 15), base, { includeSeconds: true })).toBe(
      '20 seconds'
    );
    expect(formatDistance(new Date(2015, 0, 1, 0, 0, 30), base, { includeSeconds: true })).toBe(
      '30 seconds'
    );
    expect(formatDistance(new Date(2015, 0, 1, 0, 0, 50), base, { includeSeconds: true })).toBe(
      '1 minute'
    );
    expect(formatDistance(new Date(2015, 0, 1, 0, 1, 5), base, { includeSeconds: true })).toBe(
      '1 minute'
    );
  });

  it('renders "1 minute" for the same instant', () => {
    expect(formatDistance(base, base)).toBe('1 minute');
  });

  it('matches date-fns for ZonedDateTime input', () => {
    const date = new Date(2015, 6, 1);
    expect(formatDistance(toZonedDateTime(date), toZonedDateTime(base))).toBe(
      dateFnsFormatDistance(date, base)
    );
  });

  it('matches date-fns+UTCDate for PlainDateTime input', () => {
    const date = new Date(2015, 6, 1);
    expect(formatDistance(toPlainDateTime(date), toPlainDateTime(base))).toBe(
      dateFnsFormatDistance(toUTCDate(date), toUTCDate(base))
    );
  });

  it('matches date-fns+UTCDate for PlainDate input', () => {
    const date = new Date(2015, 6, 1);
    expect(formatDistance(toPlainDate(date), toPlainDate(base))).toBe(
      dateFnsFormatDistance(toUTCDate(date), toUTCDate(base))
    );
  });
});
