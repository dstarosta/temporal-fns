import { describe, expect, it } from 'vitest';
import { startOfWeekYear as dateFnsStartOfWeekYear } from 'date-fns';
import { startOfWeekYear } from '../src/start-of-week-year.js';
import { testDateTransformFn } from './helpers/test-date-transform-fn.js';
import {
  fixtureDates,
  toPlainDate,
  toPlainDateTime,
  toUTCDate,
  toZonedDateTime,
} from './helpers/fixtures.js';

describe('startOfWeekYear', () => {
  testDateTransformFn(startOfWeekYear, dateFnsStartOfWeekYear);

  for (const date of fixtureDates) {
    it(`matches date-fns with weekStartsOn/firstWeekContainsDate (${date.toISOString()})`, () => {
      const options = { weekStartsOn: 1 as const, firstWeekContainsDate: 4 as const };
      expect(startOfWeekYear(date, options)).toEqual(dateFnsStartOfWeekYear(date, options));
    });

    it(`matches date-fns for ZonedDateTime input with options (${date.toISOString()})`, () => {
      const options = { weekStartsOn: 1 as const, firstWeekContainsDate: 4 as const };
      const expected = toZonedDateTime(dateFnsStartOfWeekYear(date, options));
      expect(startOfWeekYear(toZonedDateTime(date), options).toString()).toBe(expected.toString());
    });

    it(`matches date-fns+UTCDate for PlainDateTime input with options (${date.toISOString()})`, () => {
      const options = { weekStartsOn: 1 as const, firstWeekContainsDate: 4 as const };
      const expected = toPlainDateTime(dateFnsStartOfWeekYear(toUTCDate(date), options));
      expect(startOfWeekYear(toPlainDateTime(date), options).toString()).toBe(expected.toString());
    });

    it(`matches date-fns+UTCDate for PlainDate input with options (${date.toISOString()})`, () => {
      const options = { weekStartsOn: 1 as const, firstWeekContainsDate: 4 as const };
      const expected = toPlainDate(dateFnsStartOfWeekYear(toUTCDate(date), options));
      expect(startOfWeekYear(toPlainDate(date), options).toString()).toBe(expected.toString());
    });
  }
});
