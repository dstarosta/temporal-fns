import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fixtureDates, toPlainDateTime, toUTCDate, toZonedDateTime } from './fixtures.js';
import { type TimeLike } from '../../src/types.js';

type NowPredicateTimeFn = {
  (date: Date): boolean;
  (date: TimeLike): boolean;
};

export function testNowPredicateTimeFn(
  fn: NowPredicateTimeFn,
  dateFnsFn: (date: Date) => boolean,
  fakeNow: Date,
  dates: Date[] = fixtureDates
): void {
  describe('with mocked Date.now()', () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(fakeNow);
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it.each(dates)('matches date-fns for Date input (%s)', (date) => {
      expect(fn(date)).toBe(dateFnsFn(date));
    });
  });
}

// See test-now-predicate-fn.ts for why the Temporal-type branches run
// unmocked against real-time-relative offsets.
export function testNowPredicateTimeFnRealTime(
  fn: NowPredicateTimeFn,
  dateFnsFn: (date: Date) => boolean,
  offsetsMs: number[]
): void {
  for (const offsetMs of offsetsMs) {
    const label = String(offsetMs);

    it(`matches date-fns+UTCDate for PlainDateTime input (offset ${label}ms)`, () => {
      const date = new Date(Date.now() + offsetMs);
      expect(fn(toPlainDateTime(date))).toBe(dateFnsFn(toUTCDate(date)));
    });

    it(`matches date-fns for ZonedDateTime input (offset ${label}ms)`, () => {
      const date = new Date(Date.now() + offsetMs);
      expect(fn(toZonedDateTime(date))).toBe(dateFnsFn(date));
    });
  }
}
