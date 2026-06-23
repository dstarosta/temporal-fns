import { describe, expect, it } from 'vitest';
import { startOfYesterdayPlainDateTime } from '../src/start-of-yesterday-plain-date-time.js';

describe('startOfYesterdayPlainDateTime', () => {
  it('is midnight on the day before the current UTC calendar date', () => {
    const before = Temporal.Now.instant().toZonedDateTimeISO('UTC').toPlainDate();
    const result = startOfYesterdayPlainDateTime();
    const after = Temporal.Now.instant().toZonedDateTimeISO('UTC').toPlainDate();

    expect(result.hour).toBe(0);
    expect([
      before.subtract({ days: 1 }).toString(),
      after.subtract({ days: 1 }).toString(),
    ]).toContain(result.toPlainDate().toString());
  });
});
