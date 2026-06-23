import { describe, expect, it } from 'vitest';
import { endOfYesterdayZonedDateTime } from '../src/end-of-yesterday-zoned-date-time.js';

describe('endOfYesterdayZonedDateTime', () => {
  it('is 23:59:59.999 on the day before the current calendar date in the given timezone', () => {
    const before = Temporal.Now.instant().toZonedDateTimeISO('Asia/Tokyo').toPlainDate();
    const result = endOfYesterdayZonedDateTime('Asia/Tokyo');
    const after = Temporal.Now.instant().toZonedDateTimeISO('Asia/Tokyo').toPlainDate();

    expect(result.hour).toBe(23);
    expect(result.millisecond).toBe(999);
    expect([
      before.subtract({ days: 1 }).toString(),
      after.subtract({ days: 1 }).toString(),
    ]).toContain(result.toPlainDate().toString());
  });
});
