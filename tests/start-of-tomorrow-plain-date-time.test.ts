import { describe, expect, it } from 'vitest';
import { startOfTomorrowPlainDateTime } from '../src/start-of-tomorrow-plain-date-time.js';

describe('startOfTomorrowPlainDateTime', () => {
  it('is midnight on the day after the current UTC calendar date', () => {
    const before = Temporal.Now.instant().toZonedDateTimeISO('UTC').toPlainDate();
    const result = startOfTomorrowPlainDateTime();
    const after = Temporal.Now.instant().toZonedDateTimeISO('UTC').toPlainDate();

    expect(result.hour).toBe(0);
    expect([before.add({ days: 1 }).toString(), after.add({ days: 1 }).toString()]).toContain(
      result.toPlainDate().toString()
    );
  });
});
