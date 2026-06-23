import { describe, expect, it } from 'vitest';
import { endOfTodayZonedDateTime } from '../src/end-of-today-zoned-date-time.js';

describe('endOfTodayZonedDateTime', () => {
  it('is 23:59:59.999 in the given timezone on the current calendar date', () => {
    const before = Temporal.Now.instant().toZonedDateTimeISO('Asia/Tokyo').toPlainDate();
    const result = endOfTodayZonedDateTime('Asia/Tokyo');
    const after = Temporal.Now.instant().toZonedDateTimeISO('Asia/Tokyo').toPlainDate();

    expect(result.hour).toBe(23);
    expect(result.millisecond).toBe(999);
    expect(result.timeZoneId).toBe('Asia/Tokyo');
    expect([before.toString(), after.toString()]).toContain(result.toPlainDate().toString());
  });
});
