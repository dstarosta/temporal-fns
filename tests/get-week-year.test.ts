import { describe, expect, it } from 'vitest';
import { getWeekYear as dateFnsGetWeekYear } from 'date-fns';
import { getWeekYear } from '../src/get-week-year.js';
import { toPlainDate, toPlainDateTime, toUTCDate, toZonedDateTime } from './helpers/fixtures.js';

describe('getWeekYear', () => {
  const dates = [
    new Date(2004, 11, 26),
    new Date(2026, 5, 19, 14, 32, 10, 250),
    new Date(2026, 11, 31, 23, 59, 59, 999),
    new Date(2024, 1, 29, 12, 0, 0, 0),
  ];

  for (const date of dates) {
    it(`matches date-fns for Date input (${date.toISOString()})`, () => {
      expect(getWeekYear(date)).toBe(dateFnsGetWeekYear(date));
    });
  }

  it('matches date-fns with weekStartsOn option', () => {
    const date = new Date(2004, 11, 26);
    expect(getWeekYear(date, { weekStartsOn: 6 })).toBe(
      dateFnsGetWeekYear(date, { weekStartsOn: 6 })
    );
  });

  it('matches date-fns with firstWeekContainsDate option', () => {
    const date = new Date(2004, 11, 26);
    expect(getWeekYear(date, { firstWeekContainsDate: 4 })).toBe(
      dateFnsGetWeekYear(date, { firstWeekContainsDate: 4 })
    );
  });

  it('matches date-fns for ZonedDateTime input', () => {
    const date = new Date(2026, 5, 19, 14, 32, 10, 250);
    expect(getWeekYear(toZonedDateTime(date))).toBe(dateFnsGetWeekYear(date));
  });

  it('matches date-fns+UTCDate for PlainDateTime input', () => {
    const date = new Date(2026, 5, 19, 14, 32, 10, 250);
    expect(getWeekYear(toPlainDateTime(date))).toBe(dateFnsGetWeekYear(toUTCDate(date)));
  });

  it('matches date-fns+UTCDate for PlainDate input', () => {
    const date = new Date(2026, 5, 19);
    expect(getWeekYear(toPlainDate(date))).toBe(dateFnsGetWeekYear(toUTCDate(date)));
  });
});
