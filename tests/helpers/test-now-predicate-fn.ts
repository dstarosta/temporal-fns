import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  fixtureDates,
  toPlainDate,
  toPlainDateTime,
  toUTCDate,
  toZonedDateTime,
} from './fixtures.js';
import { type DateLike } from '../../src/types.js';

type NowPredicateFn = {
  (date: Date): boolean;
  (date: DateLike): boolean;
};

// For "now"-relative predicates (isToday, isThisWeek, etc.) — pins Date.now()
// so both temporal-fns and date-fns observe the same instant for the Date
// branch. Scoped in its own describe so the mock doesn't leak into sibling
// real-time test cases registered in the same file.
export function testNowPredicateFn(
  fn: NowPredicateFn,
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

// Real-time-relative cases for the Temporal-type branches. Temporal.Now reads
// real wall-clock time and isn't affected by vi.setSystemTime(), so these
// run unmocked: `offsetsMs` are applied to the actual current instant.
// PlainDateTime is compared against date-fns run with `UTCDate` against the
// real current *UTC* instant, per the UTC rule. PlainDate has no time
// component, so its "now" is the system's local calendar date (see
// construct-now.ts) — it's compared against plain (local) date-fns, NOT
// UTCDate, otherwise this test is flaky/wrong whenever local and UTC
// disagree on the current calendar date (e.g. near UTC midnight in
// timezones behind UTC). ZonedDateTime (defaulting to the system zone) is
// also compared against plain date-fns, since constructNow's ZonedDateTime
// branch uses the value's own (here: system) zone.
export function testNowPredicateFnRealTime(
  fn: NowPredicateFn,
  dateFnsFn: (date: Date) => boolean,
  offsetsMs: number[]
): void {
  for (const offsetMs of offsetsMs) {
    const label = String(offsetMs);

    it(`matches date-fns for PlainDate input (offset ${label}ms)`, () => {
      const date = new Date(Date.now() + offsetMs);
      expect(fn(toPlainDate(date))).toBe(dateFnsFn(date));
    });

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
