import { describe, expect, it } from 'vitest';
import { yesterdayPlainDateTime } from '../src/yesterday-plain-date-time.js';

describe('yesterdayPlainDateTime', () => {
  it('is exactly one day before the current UTC calendar date', () => {
    const before = Temporal.Now.instant().toZonedDateTimeISO('UTC').toPlainDate();
    const result = yesterdayPlainDateTime();
    const after = Temporal.Now.instant().toZonedDateTimeISO('UTC').toPlainDate();

    expect([
      before.subtract({ days: 1 }).toString(),
      after.subtract({ days: 1 }).toString(),
    ]).toContain(result.toPlainDate().toString());
  });
});
