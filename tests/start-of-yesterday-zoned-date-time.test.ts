import { describe, expect, it } from 'vitest';
import { startOfYesterdayZonedDateTime } from '../src/start-of-yesterday-zoned-date-time.js';

describe('startOfYesterdayZonedDateTime', () => {
  it('is midnight on the day before the current calendar date in the given timezone', () => {
    const before = Temporal.Now.instant().toZonedDateTimeISO('Asia/Tokyo').toPlainDate();
    const result = startOfYesterdayZonedDateTime('Asia/Tokyo');
    const after = Temporal.Now.instant().toZonedDateTimeISO('Asia/Tokyo').toPlainDate();

    expect(result.hour).toBe(0);
    expect([
      before.subtract({ days: 1 }).toString(),
      after.subtract({ days: 1 }).toString(),
    ]).toContain(result.toPlainDate().toString());
  });
});
