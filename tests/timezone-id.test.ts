import { describe, expect, it } from 'vitest';
import { timeZoneIds } from '../src/timezone-id.js';

describe('timeZoneIds', () => {
  it('matches the running runtime\'s Intl.supportedValuesOf("timeZone")', () => {
    expect([...timeZoneIds]).toEqual(Intl.supportedValuesOf('timeZone'));
  });

  it('contains no duplicates', () => {
    expect(new Set(timeZoneIds).size).toBe(timeZoneIds.length);
  });
});
