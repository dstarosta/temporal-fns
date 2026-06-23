import { describe, expect, it } from 'vitest';
import { setWeek as dateFnsSetWeek } from 'date-fns';
import { setWeek } from '../src/set-week.js';
import {
  fixtureDates,
  toPlainDate,
  toPlainDateTime,
  toUTCDate,
  toZonedDateTime,
} from './helpers/fixtures.js';

describe('setWeek', () => {
  for (const date of fixtureDates) {
    it(`matches date-fns for Date input (${date.toISOString()})`, () => {
      expect(setWeek(date, 5)).toEqual(dateFnsSetWeek(date, 5));
    });

    it(`matches date-fns with weekStartsOn/firstWeekContainsDate (${date.toISOString()})`, () => {
      const options = { weekStartsOn: 1 as const, firstWeekContainsDate: 4 as const };
      expect(setWeek(date, 20, options)).toEqual(dateFnsSetWeek(date, 20, options));
    });

    it(`matches date-fns for ZonedDateTime input (${date.toISOString()})`, () => {
      const expected = toZonedDateTime(dateFnsSetWeek(date, 5));
      expect(setWeek(toZonedDateTime(date), 5).toString()).toBe(expected.toString());
    });

    it(`matches date-fns+UTCDate for PlainDateTime input (${date.toISOString()})`, () => {
      const expected = toPlainDateTime(dateFnsSetWeek(toUTCDate(date), 5));
      expect(setWeek(toPlainDateTime(date), 5).toString()).toBe(expected.toString());
    });

    it(`matches date-fns+UTCDate for PlainDate input (${date.toISOString()})`, () => {
      const expected = toPlainDate(dateFnsSetWeek(toUTCDate(date), 5));
      expect(setWeek(toPlainDate(date), 5).toString()).toBe(expected.toString());
    });
  }
});
