import { describe, expect, it } from 'vitest';
import { getTime as dateFnsGetTime } from 'date-fns';
import { getTime } from '../src/get-time.js';
import {
  fixtureDates,
  toMidnightUTCDate,
  toPlainDate,
  toPlainDateTime,
  toUTCDate,
  toZonedDateTime,
} from './helpers/fixtures.js';

describe('getTime', () => {
  for (const date of fixtureDates) {
    it(`matches date-fns for Date input (${date.toISOString()})`, () => {
      expect(getTime(date)).toBe(dateFnsGetTime(date));
    });

    it(`matches date-fns for ZonedDateTime input (${date.toISOString()})`, () => {
      expect(getTime(toZonedDateTime(date))).toBe(dateFnsGetTime(date));
    });

    it(`matches date-fns+UTCDate for PlainDateTime input (${date.toISOString()})`, () => {
      expect(getTime(toPlainDateTime(date))).toBe(dateFnsGetTime(toUTCDate(date)));
    });

    it(`matches date-fns+UTCDate for PlainDate input (${date.toISOString()})`, () => {
      expect(getTime(toPlainDate(date))).toBe(dateFnsGetTime(toMidnightUTCDate(date)));
    });
  }
});
