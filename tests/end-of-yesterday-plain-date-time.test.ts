import { describe, expect, it } from 'vitest';
import { endOfYesterdayPlainDateTime } from '../src/end-of-yesterday-plain-date-time.js';

describe('endOfYesterdayPlainDateTime', () => {
  it('is 23:59:59.999 on the day before the current UTC calendar date', () => {
    const before = Temporal.Now.instant().toZonedDateTimeISO('UTC').toPlainDate();
    const result = endOfYesterdayPlainDateTime();
    const after = Temporal.Now.instant().toZonedDateTimeISO('UTC').toPlainDate();

    expect(result.hour).toBe(23);
    expect(result.millisecond).toBe(999);
    expect([
      before.subtract({ days: 1 }).toString(),
      after.subtract({ days: 1 }).toString(),
    ]).toContain(result.toPlainDate().toString());
  });
});
