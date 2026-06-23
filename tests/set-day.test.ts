import { describe, expect, it } from 'vitest';
import { setDay as dateFnsSetDay } from 'date-fns';
import { setDay } from '../src/set-day.js';
import { fixtureDates, toPlainDate, toPlainDateTime, toZonedDateTime } from './helpers/fixtures.js';

describe('setDay', () => {
  const dayValues = [-3, -1, 0, 1, 3, 6, 9];
  const weekStartsOnValues = [0, 1, 6] as const;

  for (const day of dayValues) {
    for (const weekStartsOn of weekStartsOnValues) {
      const label = `day=${String(day)}, weekStartsOn=${String(weekStartsOn)}`;

      it.each(fixtureDates)(`matches date-fns for Date input, ${label} (%s)`, (date) => {
        expect(setDay(date, day, { weekStartsOn }).toString()).toBe(
          dateFnsSetDay(date, day, { weekStartsOn }).toString()
        );
      });

      it.each(fixtureDates)(`matches date-fns for PlainDate input, ${label} (%s)`, (date) => {
        const expected = dateFnsSetDay(date, day, { weekStartsOn });
        expect(setDay(toPlainDate(date), day, { weekStartsOn }).toString()).toBe(
          toPlainDate(expected).toString()
        );
      });

      it.each(fixtureDates)(`matches date-fns for PlainDateTime input, ${label} (%s)`, (date) => {
        const expected = dateFnsSetDay(date, day, { weekStartsOn });
        expect(setDay(toPlainDateTime(date), day, { weekStartsOn }).toString()).toBe(
          toPlainDateTime(expected).toString()
        );
      });

      it.each(fixtureDates)(`matches date-fns for ZonedDateTime input, ${label} (%s)`, (date) => {
        const expected = dateFnsSetDay(date, day, { weekStartsOn });
        expect(setDay(toZonedDateTime(date), day, { weekStartsOn }).toString()).toBe(
          toZonedDateTime(expected).toString()
        );
      });
    }
  }

  it.each(fixtureDates)('matches date-fns default (no options) for Date input (%s)', (date) => {
    expect(setDay(date, 3).toString()).toBe(dateFnsSetDay(date, 3).toString());
  });
});
