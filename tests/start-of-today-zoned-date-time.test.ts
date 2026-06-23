import { describe, expect, it } from 'vitest';
import { startOfTodayZonedDateTime } from '../src/start-of-today-zoned-date-time.js';

describe('startOfTodayZonedDateTime', () => {
  it('is midnight in the given timezone on the current calendar date', () => {
    const before = Temporal.Now.instant().toZonedDateTimeISO('Asia/Tokyo').toPlainDate();
    const result = startOfTodayZonedDateTime('Asia/Tokyo');
    const after = Temporal.Now.instant().toZonedDateTimeISO('Asia/Tokyo').toPlainDate();

    expect(result.hour).toBe(0);
    expect(result.timeZoneId).toBe('Asia/Tokyo');
    expect([before.toString(), after.toString()]).toContain(result.toPlainDate().toString());
  });
});
