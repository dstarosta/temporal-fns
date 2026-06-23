import { describe, expect, it } from 'vitest';
import { startOfTomorrowZonedDateTime } from '../src/start-of-tomorrow-zoned-date-time.js';

describe('startOfTomorrowZonedDateTime', () => {
  it('is midnight on the day after the current calendar date in the given timezone', () => {
    const before = Temporal.Now.instant().toZonedDateTimeISO('Asia/Tokyo').toPlainDate();
    const result = startOfTomorrowZonedDateTime('Asia/Tokyo');
    const after = Temporal.Now.instant().toZonedDateTimeISO('Asia/Tokyo').toPlainDate();

    expect(result.hour).toBe(0);
    expect([before.add({ days: 1 }).toString(), after.add({ days: 1 }).toString()]).toContain(
      result.toPlainDate().toString()
    );
  });
});
