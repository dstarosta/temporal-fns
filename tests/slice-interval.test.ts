import { describe, expect, it } from 'vitest';
import { sliceInterval } from '../src/slice-interval.js';
import { toPlainDate, toPlainDateTime, toZonedDateTime } from './helpers/fixtures.js';

describe('sliceInterval', () => {
  // A 10-day interval chunked into 3-day pieces: [0,3) [3,6) [6,9) [9,10).
  const interval = { start: new Date(2014, 0, 1), end: new Date(2014, 0, 10) };

  it('returns the envelope of a positive index range', () => {
    expect(sliceInterval(interval, { days: 3 }, 0, 2)).toEqual({
      start: new Date(2014, 0, 1),
      end: new Date(2014, 0, 7),
    });
  });

  it('defaults endIndex to the end of the chunk list', () => {
    expect(sliceInterval(interval, { days: 3 }, 1)).toEqual({
      start: new Date(2014, 0, 4),
      end: new Date(2014, 0, 10),
    });
  });

  it('supports a negative startIndex, counting from the end', () => {
    expect(sliceInterval(interval, { days: 3 }, -1)).toEqual({
      start: new Date(2014, 0, 7),
      end: new Date(2014, 0, 10),
    });
  });

  it('supports a negative endIndex, counting from the end', () => {
    expect(sliceInterval(interval, { days: 3 }, 0, -1)).toEqual({
      start: new Date(2014, 0, 1),
      end: new Date(2014, 0, 7),
    });
  });

  it('returns null for an out-of-range startIndex', () => {
    expect(sliceInterval(interval, { days: 3 }, 10)).toBeNull();
  });

  it('returns null when startIndex >= endIndex', () => {
    expect(sliceInterval(interval, { days: 3 }, 2, 1)).toBeNull();
  });

  it('returns the single selected chunk untouched', () => {
    expect(sliceInterval(interval, { days: 3 }, 0, 1)).toEqual({
      start: new Date(2014, 0, 1),
      end: new Date(2014, 0, 4),
    });
  });

  it('slices PlainDate input', () => {
    const plainInterval = {
      start: toPlainDate(interval.start),
      end: toPlainDate(interval.end),
    };
    expect(sliceInterval(plainInterval, { days: 3 }, 0, 2)).toEqual({
      start: toPlainDate(new Date(2014, 0, 1)),
      end: toPlainDate(new Date(2014, 0, 7)),
    });
  });

  it('slices PlainDateTime input', () => {
    const plainInterval = {
      start: toPlainDateTime(interval.start),
      end: toPlainDateTime(interval.end),
    };
    expect(sliceInterval(plainInterval, { days: 3 }, 0, 2)).toEqual({
      start: toPlainDateTime(new Date(2014, 0, 1)),
      end: toPlainDateTime(new Date(2014, 0, 7)),
    });
  });

  it('slices ZonedDateTime input', () => {
    const zonedInterval = {
      start: toZonedDateTime(interval.start),
      end: toZonedDateTime(interval.end),
    };
    expect(sliceInterval(zonedInterval, { days: 3 }, 0, 2)).toEqual({
      start: toZonedDateTime(new Date(2014, 0, 1)),
      end: toZonedDateTime(new Date(2014, 0, 7)),
    });
  });
});
