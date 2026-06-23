import { describe, expect, it } from 'vitest';
import { tomorrowPlainDate } from '../src/tomorrow-plain-date.js';

describe('tomorrowPlainDate', () => {
  it('is exactly one day after the system calendar date', () => {
    const before = Temporal.Now.instant();
    const result = tomorrowPlainDate();
    const after = Temporal.Now.instant();

    const timeZone = Temporal.Now.timeZoneId();
    const todayBefore = before.toZonedDateTimeISO(timeZone).toPlainDate();
    const todayAfter = after.toZonedDateTimeISO(timeZone).toPlainDate();

    expect([
      todayBefore.add({ days: 1 }).toString(),
      todayAfter.add({ days: 1 }).toString(),
    ]).toContain(result.toString());
  });
});
