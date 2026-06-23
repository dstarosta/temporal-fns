import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { formatDistanceToNowStrict as dateFnsFormatDistanceToNowStrict } from 'date-fns';
import { formatDistanceToNowStrict } from '../src/format-distance-to-now-strict.js';
import { toPlainDate, toPlainDateTime, toUTCDate, toZonedDateTime } from './helpers/fixtures.js';

describe('formatDistanceToNowStrict', () => {
  describe('with mocked Date.now()', () => {
    const now = new Date(2024, 0, 1, 12, 0, 0);

    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(now);
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('matches date-fns for Date input', () => {
      const date = new Date(2024, 6, 1);
      expect(formatDistanceToNowStrict(date)).toBe(dateFnsFormatDistanceToNowStrict(date));
    });

    it('matches date-fns for Date input with a forced unit', () => {
      const date = new Date(2024, 6, 1);
      expect(formatDistanceToNowStrict(date, { unit: 'day' })).toBe(
        dateFnsFormatDistanceToNowStrict(date, { unit: 'day' })
      );
    });
  });

  // See format-distance-to-now.test.ts for why these run unmocked.
  describe('against real time (Temporal.Now is not mockable)', () => {
    const offsetMs = 180 * 24 * 60 * 60 * 1000;

    it('matches date-fns for ZonedDateTime input (system zone)', () => {
      const date = new Date(Date.now() + offsetMs);
      expect(formatDistanceToNowStrict(toZonedDateTime(date))).toBe(
        dateFnsFormatDistanceToNowStrict(date)
      );
    });

    it('matches date-fns+UTCDate for PlainDateTime input', () => {
      const date = new Date(Date.now() + offsetMs);
      expect(formatDistanceToNowStrict(toPlainDateTime(date))).toBe(
        dateFnsFormatDistanceToNowStrict(toUTCDate(date))
      );
    });

    it('matches date-fns+UTCDate for PlainDate input', () => {
      const date = new Date(Date.now() + offsetMs);
      expect(formatDistanceToNowStrict(toPlainDate(date))).toBe(
        dateFnsFormatDistanceToNowStrict(toUTCDate(date))
      );
    });
  });
});
