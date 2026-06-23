import { describe, expect, it } from 'vitest';
import { nextDay as dateFnsNextDay } from 'date-fns';
import { nextDay } from '../src/next-day.js';
import { fixtureDates, toPlainDate, toPlainDateTime, toZonedDateTime } from './helpers/fixtures.js';

describe('nextDay', () => {
  const days = [0, 1, 2, 3, 4, 5, 6] as const;

  for (const day of days) {
    const label = String(day);

    it.each(fixtureDates)(`matches date-fns for Date input, day=${label} (%s)`, (date) => {
      expect(nextDay(date, day)).toEqual(dateFnsNextDay(date, day));
    });

    it.each(fixtureDates)(`matches date-fns for PlainDate input, day=${label} (%s)`, (date) => {
      const expected = toPlainDate(dateFnsNextDay(date, day));
      expect(nextDay(toPlainDate(date), day).toString()).toBe(expected.toString());
    });

    it.each(fixtureDates)(`matches date-fns for PlainDateTime input, day=${label} (%s)`, (date) => {
      const expected = toPlainDateTime(dateFnsNextDay(date, day));
      expect(nextDay(toPlainDateTime(date), day).toString()).toBe(expected.toString());
    });

    it.each(fixtureDates)(`matches date-fns for ZonedDateTime input, day=${label} (%s)`, (date) => {
      const expected = toZonedDateTime(dateFnsNextDay(date, day));
      expect(nextDay(toZonedDateTime(date), day).toString()).toBe(expected.toString());
    });
  }
});
