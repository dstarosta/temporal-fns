import { describe, expect, it } from 'vitest';
import { yesterdayPlainDate } from '../src/yesterday-plain-date.js';

describe('yesterdayPlainDate', () => {
  it('is exactly one day before the system calendar date', () => {
    const before = Temporal.Now.instant();
    const result = yesterdayPlainDate();
    const after = Temporal.Now.instant();

    const timeZone = Temporal.Now.timeZoneId();
    const todayBefore = before.toZonedDateTimeISO(timeZone).toPlainDate();
    const todayAfter = after.toZonedDateTimeISO(timeZone).toPlainDate();

    expect([
      todayBefore.subtract({ days: 1 }).toString(),
      todayAfter.subtract({ days: 1 }).toString(),
    ]).toContain(result.toString());
  });
});
