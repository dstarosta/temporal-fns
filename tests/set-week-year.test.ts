import { describe, expect, it } from 'vitest';
import { setWeekYear as dateFnsSetWeekYear } from 'date-fns';
import { setWeekYear } from '../src/set-week-year.js';
import {
  fixtureDates,
  toPlainDate,
  toPlainDateTime,
  toUTCDate,
  toZonedDateTime,
} from './helpers/fixtures.js';

describe('setWeekYear', () => {
  for (const date of fixtureDates) {
    it(`matches date-fns for Date input (${date.toISOString()})`, () => {
      expect(setWeekYear(date, 2020)).toEqual(dateFnsSetWeekYear(date, 2020));
    });

    it(`matches date-fns with weekStartsOn/firstWeekContainsDate (${date.toISOString()})`, () => {
      const options = { weekStartsOn: 1 as const, firstWeekContainsDate: 4 as const };
      expect(setWeekYear(date, 2030, options)).toEqual(dateFnsSetWeekYear(date, 2030, options));
    });

    it(`matches date-fns for ZonedDateTime input (${date.toISOString()})`, () => {
      const expected = toZonedDateTime(dateFnsSetWeekYear(date, 2020));
      expect(setWeekYear(toZonedDateTime(date), 2020).toString()).toBe(expected.toString());
    });

    it(`matches date-fns+UTCDate for PlainDateTime input (${date.toISOString()})`, () => {
      const expected = toPlainDateTime(dateFnsSetWeekYear(toUTCDate(date), 2020));
      expect(setWeekYear(toPlainDateTime(date), 2020).toString()).toBe(expected.toString());
    });

    it(`matches date-fns+UTCDate for PlainDate input (${date.toISOString()})`, () => {
      const expected = toPlainDate(dateFnsSetWeekYear(toUTCDate(date), 2020));
      expect(setWeekYear(toPlainDate(date), 2020).toString()).toBe(expected.toString());
    });
  }
});
