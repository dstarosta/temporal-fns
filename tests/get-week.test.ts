import { describe, expect, it } from 'vitest';
import { getWeek as dateFnsGetWeek } from 'date-fns';
import { getWeek } from '../src/get-week.js';
import { toPlainDate, toPlainDateTime, toUTCDate, toZonedDateTime } from './helpers/fixtures.js';

describe('getWeek', () => {
  const dates = [
    new Date(2005, 0, 2),
    new Date(2026, 5, 19, 14, 32, 10, 250),
    new Date(2026, 11, 31, 23, 59, 59, 999),
    new Date(2024, 1, 29, 12, 0, 0, 0),
  ];

  for (const date of dates) {
    it(`matches date-fns for Date input (${date.toISOString()})`, () => {
      expect(getWeek(date)).toBe(dateFnsGetWeek(date));
    });
  }

  it('matches date-fns with weekStartsOn/firstWeekContainsDate options', () => {
    const date = new Date(2005, 0, 2);
    expect(getWeek(date, { weekStartsOn: 1, firstWeekContainsDate: 4 })).toBe(
      dateFnsGetWeek(date, { weekStartsOn: 1, firstWeekContainsDate: 4 })
    );
  });

  it('matches date-fns for ZonedDateTime input', () => {
    const date = new Date(2026, 5, 19, 14, 32, 10, 250);
    expect(getWeek(toZonedDateTime(date))).toBe(dateFnsGetWeek(date));
  });

  it('matches date-fns+UTCDate for PlainDateTime input', () => {
    const date = new Date(2026, 5, 19, 14, 32, 10, 250);
    expect(getWeek(toPlainDateTime(date))).toBe(dateFnsGetWeek(toUTCDate(date)));
  });

  it('matches date-fns+UTCDate for PlainDate input', () => {
    const date = new Date(2026, 5, 19);
    expect(getWeek(toPlainDate(date))).toBe(dateFnsGetWeek(toUTCDate(date)));
  });
});
