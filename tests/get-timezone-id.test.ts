import { describe, expect, it } from 'vitest';
import { getTimezoneId } from '../src/get-timezone-id.js';

describe('getTimezoneId', () => {
  it('matches Temporal.Now.timeZoneId()', () => {
    expect(getTimezoneId()).toBe(Temporal.Now.timeZoneId());
  });

  it('returns a non-empty string', () => {
    expect(typeof getTimezoneId()).toBe('string');
    expect(getTimezoneId().length).toBeGreaterThan(0);
  });
});
