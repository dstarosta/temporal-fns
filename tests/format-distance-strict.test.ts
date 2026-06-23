import { describe, expect, it } from 'vitest';
import { formatDistanceStrict as dateFnsFormatDistanceStrict } from 'date-fns';
import { formatDistanceStrict } from '../src/format-distance-strict.js';
import { toPlainDate, toPlainDateTime, toUTCDate, toZonedDateTime } from './helpers/fixtures.js';

describe('formatDistanceStrict', () => {
  const base = new Date(2015, 0, 1, 0, 0, 0);
  const cases: { label: string; date: Date }[] = [
    { label: '15 secs', date: new Date(2015, 0, 1, 0, 0, 15) },
    { label: '45 secs', date: new Date(2015, 0, 1, 0, 0, 45) },
    { label: '5 mins', date: new Date(2015, 0, 1, 0, 5, 0) },
    { label: '90 mins', date: new Date(2015, 0, 1, 1, 30, 0) },
    { label: '5 hours', date: new Date(2015, 0, 1, 5, 0, 0) },
    { label: '28 days', date: new Date(2015, 0, 29, 0, 0, 0) },
    { label: '6 months', date: new Date(2015, 6, 1, 0, 0, 0) },
    { label: '11 months', date: new Date(2015, 11, 1, 0, 0, 0) },
    { label: '12 months exactly', date: new Date(2016, 0, 1, 0, 0, 0) },
    { label: '2 years', date: new Date(2017, 0, 1, 0, 0, 0) },
  ];

  for (const { label, date } of cases) {
    it(`matches date-fns for Date input (${label})`, () => {
      expect(formatDistanceStrict(date, base)).toBe(dateFnsFormatDistanceStrict(date, base));
    });
    it(`matches date-fns for Date input, reversed (${label})`, () => {
      expect(formatDistanceStrict(base, date)).toBe(dateFnsFormatDistanceStrict(base, date));
    });
  }

  it('matches date-fns for addSuffix, future', () => {
    const date = new Date(2015, 6, 1);
    expect(formatDistanceStrict(date, base, { addSuffix: true })).toBe(
      dateFnsFormatDistanceStrict(date, base, { addSuffix: true })
    );
  });

  it('matches date-fns for addSuffix, past', () => {
    const date = new Date(2015, 6, 1);
    expect(formatDistanceStrict(base, date, { addSuffix: true })).toBe(
      dateFnsFormatDistanceStrict(base, date, { addSuffix: true })
    );
  });

  it('matches date-fns for a forced minute unit', () => {
    const date = new Date(2016, 0, 1);
    expect(formatDistanceStrict(date, base, { unit: 'minute' })).toBe(
      dateFnsFormatDistanceStrict(date, base, { unit: 'minute' })
    );
  });

  it('matches date-fns for a forced month unit with roundingMethod ceil', () => {
    const date = new Date(2015, 0, 28);
    expect(formatDistanceStrict(date, base, { unit: 'month', roundingMethod: 'ceil' })).toBe(
      dateFnsFormatDistanceStrict(date, base, { unit: 'month', roundingMethod: 'ceil' })
    );
  });

  it('matches date-fns for a forced month unit with roundingMethod floor', () => {
    const date = new Date(2015, 0, 28);
    expect(formatDistanceStrict(date, base, { unit: 'month', roundingMethod: 'floor' })).toBe(
      dateFnsFormatDistanceStrict(date, base, { unit: 'month', roundingMethod: 'floor' })
    );
  });

  it('matches date-fns when 12 months computed (not forced) rolls up to 1 year', () => {
    const date = new Date(2015, 11, 31, 23, 59, 0);
    expect(formatDistanceStrict(date, base)).toBe(dateFnsFormatDistanceStrict(date, base));
  });

  it('matches date-fns when 12 months with unit forced to month stays in months', () => {
    const date = new Date(2016, 0, 1);
    expect(formatDistanceStrict(date, base, { unit: 'month' })).toBe(
      dateFnsFormatDistanceStrict(date, base, { unit: 'month' })
    );
  });

  it('matches date-fns for a forced month unit with a non-12-month distance', () => {
    const date = new Date(2015, 5, 1);
    expect(formatDistanceStrict(date, base, { unit: 'month' })).toBe(
      dateFnsFormatDistanceStrict(date, base, { unit: 'month' })
    );
  });

  it('matches date-fns for the same instant', () => {
    expect(formatDistanceStrict(base, base)).toBe(dateFnsFormatDistanceStrict(base, base));
  });

  it('matches date-fns for ZonedDateTime input', () => {
    const date = new Date(2015, 6, 1);
    expect(formatDistanceStrict(toZonedDateTime(date), toZonedDateTime(base))).toBe(
      dateFnsFormatDistanceStrict(date, base)
    );
  });

  it('matches date-fns+UTCDate for PlainDateTime input', () => {
    const date = new Date(2015, 6, 1);
    expect(formatDistanceStrict(toPlainDateTime(date), toPlainDateTime(base))).toBe(
      dateFnsFormatDistanceStrict(toUTCDate(date), toUTCDate(base))
    );
  });

  it('matches date-fns+UTCDate for PlainDate input', () => {
    const date = new Date(2015, 6, 1);
    expect(formatDistanceStrict(toPlainDate(date), toPlainDate(base))).toBe(
      dateFnsFormatDistanceStrict(toUTCDate(date), toUTCDate(base))
    );
  });
});
