import { describe, expect, it } from 'vitest';
import { getWeekOfMonth as dateFnsGetWeekOfMonth } from 'date-fns';
import { getWeekOfMonth } from '../src/get-week-of-month.js';
import { fixtureDates, toPlainDate, toPlainDateTime, toZonedDateTime } from './helpers/fixtures.js';
import { testNumericPredicateFn } from './helpers/test-numeric-predicate-fn.js';

describe('getWeekOfMonth', () => {
  testNumericPredicateFn(getWeekOfMonth, dateFnsGetWeekOfMonth);

  for (const date of fixtureDates) {
    it(`matches date-fns with weekStartsOn (${date.toISOString()})`, () => {
      expect(getWeekOfMonth(date, { weekStartsOn: 1 })).toBe(
        dateFnsGetWeekOfMonth(date, { weekStartsOn: 1 })
      );
    });

    it(`matches date-fns for PlainDate input with weekStartsOn (${date.toISOString()})`, () => {
      expect(getWeekOfMonth(toPlainDate(date), { weekStartsOn: 1 })).toBe(
        dateFnsGetWeekOfMonth(date, { weekStartsOn: 1 })
      );
    });

    it(`matches date-fns for PlainDateTime input with weekStartsOn (${date.toISOString()})`, () => {
      expect(getWeekOfMonth(toPlainDateTime(date), { weekStartsOn: 1 })).toBe(
        dateFnsGetWeekOfMonth(date, { weekStartsOn: 1 })
      );
    });

    it(`matches date-fns for ZonedDateTime input with weekStartsOn (${date.toISOString()})`, () => {
      expect(getWeekOfMonth(toZonedDateTime(date), { weekStartsOn: 1 })).toBe(
        dateFnsGetWeekOfMonth(date, { weekStartsOn: 1 })
      );
    });
  }
});
