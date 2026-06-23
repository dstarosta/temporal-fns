import { describe, expect, it } from 'vitest';
import { formatDistance as dateFnsFormatDistance } from 'date-fns';
import { formatDistance } from '../src/format-distance.js';
import { toPlainDate, toPlainDateTime, toUTCDate, toZonedDateTime } from './helpers/fixtures.js';

describe('formatDistance', () => {
  const base = new Date(2015, 0, 1, 0, 0, 0);
  const cases: { label: string; date: Date }[] = [
    { label: '10 secs', date: new Date(2015, 0, 1, 0, 0, 10) },
    { label: '29 secs', date: new Date(2015, 0, 1, 0, 0, 29) },
    { label: '35 secs', date: new Date(2015, 0, 1, 0, 0, 35) },
    { label: '50 secs', date: new Date(2015, 0, 1, 0, 0, 50) },
    { label: '5 mins', date: new Date(2015, 0, 1, 0, 5, 0) },
    { label: '44 mins', date: new Date(2015, 0, 1, 0, 44, 0) },
    { label: '60 mins', date: new Date(2015, 0, 1, 1, 0, 0) },
    { label: '90 mins', date: new Date(2015, 0, 1, 1, 30, 0) },
    { label: '5 hours', date: new Date(2015, 0, 1, 5, 0, 0) },
    { label: '23.5 hours', date: new Date(2015, 0, 1, 23, 30, 0) },
    { label: '30 hours (rounds to 1 day)', date: new Date(2015, 0, 2, 6, 0, 0) },
    { label: '2 days', date: new Date(2015, 0, 3, 0, 0, 0) },
    { label: '15 days', date: new Date(2015, 0, 16, 0, 0, 0) },
    { label: '45 days', date: new Date(2015, 1, 15, 0, 0, 0) },
    { label: '6 months', date: new Date(2015, 6, 1, 0, 0, 0) },
    { label: '1 year', date: new Date(2016, 0, 1, 0, 0, 0) },
    { label: '1 year 2 months', date: new Date(2016, 2, 1, 0, 0, 0) },
    { label: '1 year 5 months', date: new Date(2016, 5, 1, 0, 0, 0) },
    { label: '1 year 10 months', date: new Date(2016, 10, 1, 0, 0, 0) },
    { label: '5 years', date: new Date(2020, 0, 1, 0, 0, 0) },
  ];

  for (const { label, date } of cases) {
    it(`matches date-fns for Date input (${label})`, () => {
      expect(formatDistance(date, base)).toBe(dateFnsFormatDistance(date, base));
    });
    it(`matches date-fns for Date input, reversed (${label})`, () => {
      expect(formatDistance(base, date)).toBe(dateFnsFormatDistance(base, date));
    });
  }

  it('matches date-fns for addSuffix, future', () => {
    const date = new Date(2015, 6, 1);
    expect(formatDistance(date, base, { addSuffix: true })).toBe(
      dateFnsFormatDistance(date, base, { addSuffix: true })
    );
  });

  it('matches date-fns for addSuffix, past', () => {
    const date = new Date(2015, 6, 1);
    expect(formatDistance(base, date, { addSuffix: true })).toBe(
      dateFnsFormatDistance(base, date, { addSuffix: true })
    );
  });

  it('matches date-fns for includeSeconds: less than 5 seconds', () => {
    const date = new Date(2015, 0, 1, 0, 0, 3);
    expect(formatDistance(date, base, { includeSeconds: true })).toBe(
      dateFnsFormatDistance(date, base, { includeSeconds: true })
    );
  });

  it('matches date-fns for includeSeconds: less than 10 seconds', () => {
    const date = new Date(2015, 0, 1, 0, 0, 8);
    expect(formatDistance(date, base, { includeSeconds: true })).toBe(
      dateFnsFormatDistance(date, base, { includeSeconds: true })
    );
  });

  it('matches date-fns for includeSeconds: less than 20 seconds', () => {
    const date = new Date(2015, 0, 1, 0, 0, 15);
    expect(formatDistance(date, base, { includeSeconds: true })).toBe(
      dateFnsFormatDistance(date, base, { includeSeconds: true })
    );
  });

  it('matches date-fns for includeSeconds: half a minute', () => {
    const date = new Date(2015, 0, 1, 0, 0, 30);
    expect(formatDistance(date, base, { includeSeconds: true })).toBe(
      dateFnsFormatDistance(date, base, { includeSeconds: true })
    );
  });

  it('matches date-fns for includeSeconds: less than a minute', () => {
    const date = new Date(2015, 0, 1, 0, 0, 50);
    expect(formatDistance(date, base, { includeSeconds: true })).toBe(
      dateFnsFormatDistance(date, base, { includeSeconds: true })
    );
  });

  it('matches date-fns for includeSeconds: 1 minute', () => {
    const date = new Date(2015, 0, 1, 0, 1, 5);
    expect(formatDistance(date, base, { includeSeconds: true })).toBe(
      dateFnsFormatDistance(date, base, { includeSeconds: true })
    );
  });

  it('matches date-fns for the same instant', () => {
    expect(formatDistance(base, base)).toBe(dateFnsFormatDistance(base, base));
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
