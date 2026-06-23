import { describe, expect, it } from 'vitest';
import { getUnixTime as dateFnsGetUnixTime } from 'date-fns';
import { getUnixTime } from '../src/get-unix-time.js';
import {
  fixtureDates,
  toMidnightUTCDate,
  toPlainDate,
  toPlainDateTime,
  toUTCDate,
  toZonedDateTime,
} from './helpers/fixtures.js';

describe('getUnixTime', () => {
  for (const date of fixtureDates) {
    it(`matches date-fns for Date input (${date.toISOString()})`, () => {
      expect(getUnixTime(date)).toBe(dateFnsGetUnixTime(date));
    });

    it(`matches date-fns for ZonedDateTime input (${date.toISOString()})`, () => {
      expect(getUnixTime(toZonedDateTime(date))).toBe(dateFnsGetUnixTime(date));
    });

    it(`matches date-fns+UTCDate for PlainDateTime input (${date.toISOString()})`, () => {
      expect(getUnixTime(toPlainDateTime(date))).toBe(dateFnsGetUnixTime(toUTCDate(date)));
    });

    it(`matches date-fns+UTCDate for PlainDate input (${date.toISOString()})`, () => {
      expect(getUnixTime(toPlainDate(date))).toBe(dateFnsGetUnixTime(toMidnightUTCDate(date)));
    });
  }
});
