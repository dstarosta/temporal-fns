import { describe, expect, it } from 'vitest';
import { endOfTodayPlainDateTime } from '../src/end-of-today-plain-date-time.js';

describe('endOfTodayPlainDateTime', () => {
  it('is 23:59:59.999 on the current UTC calendar date', () => {
    const before = Temporal.Now.instant().toZonedDateTimeISO('UTC').toPlainDate();
    const result = endOfTodayPlainDateTime();
    const after = Temporal.Now.instant().toZonedDateTimeISO('UTC').toPlainDate();

    expect(result.hour).toBe(23);
    expect(result.minute).toBe(59);
    expect(result.second).toBe(59);
    expect(result.millisecond).toBe(999);
    expect([before.toString(), after.toString()]).toContain(result.toPlainDate().toString());
  });
});
