import { describe, expect, it } from 'vitest';
import { yesterdayZonedDateTime } from '../src/yesterday-zoned-date-time.js';

describe('yesterdayZonedDateTime', () => {
  it('is exactly one day before the current calendar date in the given timezone', () => {
    const before = Temporal.Now.instant().toZonedDateTimeISO('Asia/Tokyo').toPlainDate();
    const result = yesterdayZonedDateTime('Asia/Tokyo');
    const after = Temporal.Now.instant().toZonedDateTimeISO('Asia/Tokyo').toPlainDate();

    expect(result.timeZoneId).toBe('Asia/Tokyo');
    expect([
      before.subtract({ days: 1 }).toString(),
      after.subtract({ days: 1 }).toString(),
    ]).toContain(result.toPlainDate().toString());
  });
});
