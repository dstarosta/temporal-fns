import { describe, expect, it } from 'vitest';
import { tomorrowZonedDateTime } from '../src/tomorrow-zoned-date-time.js';

describe('tomorrowZonedDateTime', () => {
  it('is exactly one day after the current calendar date in the given timezone', () => {
    const before = Temporal.Now.instant().toZonedDateTimeISO('Asia/Tokyo').toPlainDate();
    const result = tomorrowZonedDateTime('Asia/Tokyo');
    const after = Temporal.Now.instant().toZonedDateTimeISO('Asia/Tokyo').toPlainDate();

    expect(result.timeZoneId).toBe('Asia/Tokyo');
    expect([before.add({ days: 1 }).toString(), after.add({ days: 1 }).toString()]).toContain(
      result.toPlainDate().toString()
    );
  });
});
