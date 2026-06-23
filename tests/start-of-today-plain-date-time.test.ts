import { describe, expect, it } from 'vitest';
import { startOfTodayPlainDateTime } from '../src/start-of-today-plain-date-time.js';

describe('startOfTodayPlainDateTime', () => {
  it('is midnight on the current UTC calendar date', () => {
    const before = Temporal.Now.instant().toZonedDateTimeISO('UTC').toPlainDate();
    const result = startOfTodayPlainDateTime();
    const after = Temporal.Now.instant().toZonedDateTimeISO('UTC').toPlainDate();

    expect(result.hour).toBe(0);
    expect(result.minute).toBe(0);
    expect(result.second).toBe(0);
    expect([before.toString(), after.toString()]).toContain(result.toPlainDate().toString());
  });
});
