import { describe, expect, it } from 'vitest';
import { endOfTomorrowPlainDateTime } from '../src/end-of-tomorrow-plain-date-time.js';

describe('endOfTomorrowPlainDateTime', () => {
  it('is 23:59:59.999 on the day after the current UTC calendar date', () => {
    const before = Temporal.Now.instant().toZonedDateTimeISO('UTC').toPlainDate();
    const result = endOfTomorrowPlainDateTime();
    const after = Temporal.Now.instant().toZonedDateTimeISO('UTC').toPlainDate();

    expect(result.hour).toBe(23);
    expect(result.millisecond).toBe(999);
    expect([before.add({ days: 1 }).toString(), after.add({ days: 1 }).toString()]).toContain(
      result.toPlainDate().toString()
    );
  });
});
