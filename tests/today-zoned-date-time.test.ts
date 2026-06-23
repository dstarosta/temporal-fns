import { describe, expect, it } from 'vitest';
import { todayZonedDateTime } from '../src/today-zoned-date-time.js';

describe('todayZonedDateTime', () => {
  it('defaults to the system timezone', () => {
    expect(todayZonedDateTime().timeZoneId).toBe(Temporal.Now.timeZoneId());
  });

  it('respects an explicit timeZone and matches Temporal.Now within a small tolerance', () => {
    const result = todayZonedDateTime('Asia/Tokyo');
    const expected = Temporal.Now.zonedDateTimeISO('Asia/Tokyo');
    expect(result.timeZoneId).toBe('Asia/Tokyo');
    const diffMs = Math.abs(result.epochMilliseconds - expected.epochMilliseconds);
    expect(diffMs).toBeLessThan(1000);
  });
});
