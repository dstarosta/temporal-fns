import { describe, expect, it } from 'vitest';
import { getWeeksInMonth as dateFnsGetWeeksInMonth } from 'date-fns';
import { getWeeksInMonth } from '../src/get-weeks-in-month.js';
import { fixtureDates, toPlainDate, toPlainDateTime, toZonedDateTime } from './helpers/fixtures.js';
import { testNumericPredicateFn } from './helpers/test-numeric-predicate-fn.js';

describe('getWeeksInMonth', () => {
  testNumericPredicateFn(getWeeksInMonth, dateFnsGetWeeksInMonth);

  for (const date of fixtureDates) {
    it(`matches date-fns with weekStartsOn (${date.toISOString()})`, () => {
      expect(getWeeksInMonth(date, { weekStartsOn: 1 })).toBe(
        dateFnsGetWeeksInMonth(date, { weekStartsOn: 1 })
      );
    });

    it(`matches date-fns for PlainDate input with weekStartsOn (${date.toISOString()})`, () => {
      expect(getWeeksInMonth(toPlainDate(date), { weekStartsOn: 1 })).toBe(
        dateFnsGetWeeksInMonth(date, { weekStartsOn: 1 })
      );
    });

    it(`matches date-fns for PlainDateTime input with weekStartsOn (${date.toISOString()})`, () => {
      expect(getWeeksInMonth(toPlainDateTime(date), { weekStartsOn: 1 })).toBe(
        dateFnsGetWeeksInMonth(date, { weekStartsOn: 1 })
      );
    });

    it(`matches date-fns for ZonedDateTime input with weekStartsOn (${date.toISOString()})`, () => {
      expect(getWeeksInMonth(toZonedDateTime(date), { weekStartsOn: 1 })).toBe(
        dateFnsGetWeeksInMonth(date, { weekStartsOn: 1 })
      );
    });
  }
});
