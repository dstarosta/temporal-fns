import { describe, expect, it } from 'vitest';
import {
  getCachedDateTimeFormat,
  getCachedRelativeTimeFormat,
} from '../../src/helpers/intl-cache.js';

describe('getCachedDateTimeFormat', () => {
  it('returns a working formatter for a normal, serializable options shape', () => {
    const formatter = getCachedDateTimeFormat('en-US', { month: 'long' });
    expect(formatter.format(new Date(2014, 1, 11))).toBe('February');
  });

  it('returns the same instance for repeated calls with the same locale/options shape', () => {
    const first = getCachedDateTimeFormat('en-US', { weekday: 'short' });
    const second = getCachedDateTimeFormat('en-US', { weekday: 'short' });
    expect(first).toBe(second);
  });

  it('returns a distinct instance for a different options shape', () => {
    const short = getCachedDateTimeFormat('en-US', { weekday: 'short' });
    const long = getCachedDateTimeFormat('en-US', { weekday: 'long' });
    expect(short).not.toBe(long);
  });

  it('falls back to constructing fresh (without caching) when options is not JSON-serializable', () => {
    // A circular-reference options object can never be cached by a JSON.stringify-based key -
    // this should still return a working formatter rather than throwing.
    interface CircularOptions extends Intl.DateTimeFormatOptions {
      self?: CircularOptions;
    }
    const circular: CircularOptions = { month: 'long' };
    circular.self = circular;
    const formatter = getCachedDateTimeFormat('en-US', circular);
    expect(formatter.format(new Date(2014, 1, 11))).toBe('February');

    // Calling again with an equally-uncacheable (but distinct) circular object must not throw,
    // and must not accidentally return a stale/incorrect cached instance either.
    const circular2: CircularOptions = { month: 'short' };
    circular2.self = circular2;
    const formatter2 = getCachedDateTimeFormat('en-US', circular2);
    expect(formatter2.format(new Date(2014, 1, 11))).toBe('Feb');
  });
});

describe('getCachedRelativeTimeFormat', () => {
  it('returns a working formatter for a normal, serializable options shape', () => {
    const formatter = getCachedRelativeTimeFormat('en-US', { numeric: 'auto' });
    expect(formatter.format(-1, 'day')).toBe('yesterday');
  });

  it('returns the same instance for repeated calls with the same locale/options shape', () => {
    const first = getCachedRelativeTimeFormat('en-US', { numeric: 'auto' });
    const second = getCachedRelativeTimeFormat('en-US', { numeric: 'auto' });
    expect(first).toBe(second);
  });
});
