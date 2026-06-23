import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { formatDistanceToNow as dateFnsFormatDistanceToNow } from 'date-fns';
import { formatDistanceToNow } from '../src/format-distance-to-now.js';
import { toPlainDate, toPlainDateTime, toUTCDate, toZonedDateTime } from './helpers/fixtures.js';

describe('formatDistanceToNow', () => {
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
      expect(formatDistanceToNow(date)).toBe(dateFnsFormatDistanceToNow(date));
    });

    it('matches date-fns for Date input with addSuffix', () => {
      const date = new Date(2024, 6, 1);
      expect(formatDistanceToNow(date, { addSuffix: true })).toBe(
        dateFnsFormatDistanceToNow(date, { addSuffix: true })
      );
    });
  });

  // Temporal.Now reads real wall-clock time and isn't affected by
  // vi.setSystemTime(), so these run unmocked against an offset from the
  // actual current instant.
  describe('against real time (Temporal.Now is not mockable)', () => {
    const offsetMs = 180 * 24 * 60 * 60 * 1000;

    it('matches date-fns for ZonedDateTime input (system zone)', () => {
      const date = new Date(Date.now() + offsetMs);
      expect(formatDistanceToNow(toZonedDateTime(date))).toBe(dateFnsFormatDistanceToNow(date));
    });

    it('matches date-fns+UTCDate for PlainDateTime input', () => {
      const date = new Date(Date.now() + offsetMs);
      expect(formatDistanceToNow(toPlainDateTime(date))).toBe(
        dateFnsFormatDistanceToNow(toUTCDate(date))
      );
    });

    it('matches date-fns+UTCDate for PlainDate input', () => {
      const date = new Date(Date.now() + offsetMs);
      expect(formatDistanceToNow(toPlainDate(date))).toBe(
        dateFnsFormatDistanceToNow(toUTCDate(date))
      );
    });
  });
});
