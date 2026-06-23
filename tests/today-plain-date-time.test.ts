import { describe, expect, it } from 'vitest';
import { todayPlainDateTime } from '../src/today-plain-date-time.js';

describe('todayPlainDateTime', () => {
  it('matches Temporal.Now.plainDateTimeISO("UTC") within a small tolerance', () => {
    const result = todayPlainDateTime();
    const expected = Temporal.Now.plainDateTimeISO('UTC');
    const diffMs = Math.abs(result.since(expected, { largestUnit: 'milliseconds' }).milliseconds);
    expect(diffMs).toBeLessThan(1000);
  });
});
