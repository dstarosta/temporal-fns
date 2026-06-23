import { describe, expect, it } from 'vitest';
import { todayPlainDate } from '../src/today-plain-date.js';

describe('todayPlainDate', () => {
  it('returns the system calendar date', () => {
    // Snapshot a single instant and derive the expected value from it,
    // rather than calling Temporal.Now twice — two independent calls could
    // straddle a midnight rollover and disagree.
    const before = Temporal.Now.instant();
    const result = todayPlainDate();
    const after = Temporal.Now.instant();

    const timeZone = Temporal.Now.timeZoneId();
    const expectedBefore = before.toZonedDateTimeISO(timeZone).toPlainDate();
    const expectedAfter = after.toZonedDateTimeISO(timeZone).toPlainDate();

    expect([expectedBefore.toString(), expectedAfter.toString()]).toContain(result.toString());
  });
});
