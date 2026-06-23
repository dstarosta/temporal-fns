import { describe, expect, it } from 'vitest';
import { endOfTomorrowZonedDateTime } from '../src/end-of-tomorrow-zoned-date-time.js';

describe('endOfTomorrowZonedDateTime', () => {
  it('is 23:59:59.999 on the day after the current calendar date in the given timezone', () => {
    const before = Temporal.Now.instant().toZonedDateTimeISO('Asia/Tokyo').toPlainDate();
    const result = endOfTomorrowZonedDateTime('Asia/Tokyo');
    const after = Temporal.Now.instant().toZonedDateTimeISO('Asia/Tokyo').toPlainDate();

    expect(result.hour).toBe(23);
    expect(result.millisecond).toBe(999);
    expect([before.add({ days: 1 }).toString(), after.add({ days: 1 }).toString()]).toContain(
      result.toPlainDate().toString()
    );
  });
});
