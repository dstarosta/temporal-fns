import { describe, expect, it } from 'vitest';
import { intlFormatDistance as dateFnsIntlFormatDistance } from 'date-fns';
import { intlFormatDistance } from '../src/intl-format-distance.js';
import { toPlainDate, toPlainDateTime, toUTCDate, toZonedDateTime } from './helpers/fixtures.js';

describe('intlFormatDistance', () => {
  const base = new Date(2024, 0, 1, 12, 0, 0);
  const cases: { label: string; date: Date }[] = [
    { label: '30 seconds', date: new Date(2024, 0, 1, 12, 0, 30) },
    { label: '5 minutes', date: new Date(2024, 0, 1, 12, 5, 0) },
    { label: '1 hour', date: new Date(2024, 0, 1, 13, 0, 0) },
    { label: '23 hours', date: new Date(2024, 0, 2, 11, 0, 0) },
    { label: '1 day', date: new Date(2024, 0, 2, 12, 0, 0) },
    { label: '5 days', date: new Date(2024, 0, 6, 12, 0, 0) },
    { label: '2 weeks', date: new Date(2024, 0, 15, 12, 0, 0) },
    {
      label: '6.96 elapsed days but 7 calendar days (rounds to week, not day)',
      date: new Date(2024, 0, 8, 11, 0, 0),
    },
    { label: '1 month', date: new Date(2024, 1, 1, 12, 0, 0) },
    { label: '2 quarters', date: new Date(2024, 8, 1, 12, 0, 0) },
    { label: '1 year', date: new Date(2025, 0, 1, 12, 0, 0) },
    { label: '5 years', date: new Date(2029, 0, 1, 12, 0, 0) },
    { label: '2 years (beyond the secondsInYear threshold)', date: new Date(2026, 0, 1, 12, 0, 0) },
    { label: 'past 30 seconds', date: new Date(2024, 0, 1, 11, 59, 30) },
    { label: 'past 1 month', date: new Date(2023, 11, 1, 12, 0, 0) },
  ];

  for (const { label, date } of cases) {
    it(`matches date-fns for Date input (${label})`, () => {
      expect(intlFormatDistance(date, base)).toBe(dateFnsIntlFormatDistance(date, base));
    });
  }

  it('matches date-fns for a forced quarter unit', () => {
    const a = new Date(2025, 6, 4, 11, 30, 0);
    const b = new Date(1986, 3, 4, 10, 30, 0);
    expect(intlFormatDistance(a, b, { unit: 'quarter' })).toBe(
      dateFnsIntlFormatDistance(a, b, { unit: 'quarter' })
    );
  });

  it('matches date-fns for a forced second unit', () => {
    const a = new Date(2024, 0, 1, 12, 0, 30);
    expect(intlFormatDistance(a, base, { unit: 'second' })).toBe(
      dateFnsIntlFormatDistance(a, base, { unit: 'second' })
    );
  });

  it('matches date-fns for a forced minute unit', () => {
    const a = new Date(2024, 0, 1, 12, 5, 0);
    expect(intlFormatDistance(a, base, { unit: 'minute' })).toBe(
      dateFnsIntlFormatDistance(a, base, { unit: 'minute' })
    );
  });

  it('matches date-fns for a forced hour unit', () => {
    const a = new Date(2024, 0, 1, 13, 0, 0);
    expect(intlFormatDistance(a, base, { unit: 'hour' })).toBe(
      dateFnsIntlFormatDistance(a, base, { unit: 'hour' })
    );
  });

  it('matches date-fns for a forced day unit', () => {
    const a = new Date(2024, 0, 6, 12, 0, 0);
    expect(intlFormatDistance(a, base, { unit: 'day' })).toBe(
      dateFnsIntlFormatDistance(a, base, { unit: 'day' })
    );
  });

  it('matches date-fns for a forced week unit', () => {
    const a = new Date(2024, 1, 1, 12, 0, 0);
    expect(intlFormatDistance(a, base, { unit: 'week' })).toBe(
      dateFnsIntlFormatDistance(a, base, { unit: 'week' })
    );
  });

  it('matches date-fns for a forced month unit', () => {
    const a = new Date(2025, 0, 1, 12, 0, 0);
    expect(intlFormatDistance(a, base, { unit: 'month' })).toBe(
      dateFnsIntlFormatDistance(a, base, { unit: 'month' })
    );
  });

  it('matches date-fns for a forced year unit', () => {
    const a = new Date(2025, 0, 1, 12, 0, 0);
    expect(intlFormatDistance(a, base, { unit: 'year' })).toBe(
      dateFnsIntlFormatDistance(a, base, { unit: 'year' })
    );
  });

  it('matches date-fns when the distance is just under a year but spans 4+ quarters', () => {
    const a = new Date(2024, 0, 1, 12, 0, 0);
    const b = new Date(2023, 0, 2, 12, 0, 0);
    expect(intlFormatDistance(a, b)).toBe(dateFnsIntlFormatDistance(a, b));
  });

  it('matches date-fns for the locale option', () => {
    const a = new Date(1986, 3, 4, 11, 30, 0);
    const b = new Date(1986, 3, 4, 10, 30, 0);
    expect(intlFormatDistance(a, b, { locale: 'es' })).toBe(
      dateFnsIntlFormatDistance(a, b, { locale: 'es' })
    );
  });

  it('matches date-fns for the numeric option', () => {
    const a = new Date(1986, 3, 5, 11, 30, 0);
    const b = new Date(1986, 3, 4, 11, 30, 0);
    expect(intlFormatDistance(a, b, { numeric: 'always' })).toBe(
      dateFnsIntlFormatDistance(a, b, { numeric: 'always' })
    );
  });

  it('matches date-fns for the style option', () => {
    const a = new Date(1988, 3, 4, 11, 30, 0);
    const b = new Date(1986, 3, 4, 11, 30, 0);
    expect(intlFormatDistance(a, b, { style: 'short' })).toBe(
      dateFnsIntlFormatDistance(a, b, { style: 'short' })
    );
  });

  it('matches date-fns for ZonedDateTime input (system zone)', () => {
    const a = new Date(2024, 0, 1, 13, 0, 0);
    const b = new Date(2024, 0, 1, 12, 0, 0);
    expect(intlFormatDistance(toZonedDateTime(a), toZonedDateTime(b))).toBe(
      dateFnsIntlFormatDistance(a, b)
    );
  });

  it('matches date-fns+UTCDate for PlainDateTime input', () => {
    const a = new Date(2024, 0, 2, 12, 0, 0);
    const b = new Date(2024, 0, 1, 12, 0, 0);
    expect(intlFormatDistance(toPlainDateTime(a), toPlainDateTime(b))).toBe(
      dateFnsIntlFormatDistance(toUTCDate(a), toUTCDate(b))
    );
  });

  it('matches date-fns+UTCDate for PlainDate input (whole-day distance)', () => {
    const a = new Date(2024, 0, 3);
    const b = new Date(2024, 0, 1);
    expect(intlFormatDistance(toPlainDate(a), toPlainDate(b))).toBe(
      dateFnsIntlFormatDistance(toUTCDate(a), toUTCDate(b))
    );
  });

  it('matches date-fns+UTCDate for PlainDate input with a forced second unit', () => {
    const a = new Date(2024, 0, 2);
    const b = new Date(2024, 0, 1);
    expect(intlFormatDistance(toPlainDate(a), toPlainDate(b), { unit: 'second' })).toBe(
      dateFnsIntlFormatDistance(toUTCDate(a), toUTCDate(b), { unit: 'second' })
    );
  });

  it('matches date-fns+UTCDate for PlainDate input with a forced minute unit', () => {
    const a = new Date(2024, 0, 2);
    const b = new Date(2024, 0, 1);
    expect(intlFormatDistance(toPlainDate(a), toPlainDate(b), { unit: 'minute' })).toBe(
      dateFnsIntlFormatDistance(toUTCDate(a), toUTCDate(b), { unit: 'minute' })
    );
  });

  it('matches date-fns+UTCDate for PlainDate input with a forced hour unit', () => {
    const a = new Date(2024, 0, 2);
    const b = new Date(2024, 0, 1);
    expect(intlFormatDistance(toPlainDate(a), toPlainDate(b), { unit: 'hour' })).toBe(
      dateFnsIntlFormatDistance(toUTCDate(a), toUTCDate(b), { unit: 'hour' })
    );
  });
});
