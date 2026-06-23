import { describe, expect, it } from 'vitest';
import { previousDay as dateFnsPreviousDay } from 'date-fns';
import { previousDay } from '../src/previous-day.js';
import { fixtureDates, toPlainDate, toPlainDateTime, toZonedDateTime } from './helpers/fixtures.js';

describe('previousDay', () => {
  const days = [0, 1, 2, 3, 4, 5, 6] as const;

  for (const day of days) {
    const label = String(day);

    it.each(fixtureDates)(`matches date-fns for Date input, day=${label} (%s)`, (date) => {
      expect(previousDay(date, day)).toEqual(dateFnsPreviousDay(date, day));
    });

    it.each(fixtureDates)(`matches date-fns for PlainDate input, day=${label} (%s)`, (date) => {
      const expected = toPlainDate(dateFnsPreviousDay(date, day));
      expect(previousDay(toPlainDate(date), day).toString()).toBe(expected.toString());
    });

    it.each(fixtureDates)(`matches date-fns for PlainDateTime input, day=${label} (%s)`, (date) => {
      const expected = toPlainDateTime(dateFnsPreviousDay(date, day));
      expect(previousDay(toPlainDateTime(date), day).toString()).toBe(expected.toString());
    });

    it.each(fixtureDates)(`matches date-fns for ZonedDateTime input, day=${label} (%s)`, (date) => {
      const expected = toZonedDateTime(dateFnsPreviousDay(date, day));
      expect(previousDay(toZonedDateTime(date), day).toString()).toBe(expected.toString());
    });
  }
});
