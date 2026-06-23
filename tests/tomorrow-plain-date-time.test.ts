import { describe, expect, it } from 'vitest';
import { tomorrowPlainDateTime } from '../src/tomorrow-plain-date-time.js';

describe('tomorrowPlainDateTime', () => {
  it('is exactly one day after the current UTC calendar date', () => {
    const before = Temporal.Now.instant().toZonedDateTimeISO('UTC').toPlainDate();
    const result = tomorrowPlainDateTime();
    const after = Temporal.Now.instant().toZonedDateTimeISO('UTC').toPlainDate();

    expect([before.add({ days: 1 }).toString(), after.add({ days: 1 }).toString()]).toContain(
      result.toPlainDate().toString()
    );
  });
});
