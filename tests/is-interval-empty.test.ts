import { describe, expect, it } from 'vitest';
import { isIntervalEmpty } from '../src/is-interval-empty.js';
import { toPlainDate, toPlainDateTime, toZonedDateTime } from './helpers/fixtures.js';

describe('isIntervalEmpty', () => {
  it('returns true when start equals end, for Date input', () => {
    const date = new Date(2014, 0, 10);
    expect(isIntervalEmpty({ start: date, end: new Date(date) })).toBe(true);
  });

  it('returns false when start and end differ, for Date input', () => {
    expect(isIntervalEmpty({ start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) })).toBe(
      false
    );
  });

  it('returns true for PlainDate input', () => {
    const date = toPlainDate(new Date(2014, 0, 10));
    expect(isIntervalEmpty({ start: date, end: date })).toBe(true);
  });

  it('returns true for PlainDateTime input', () => {
    const date = toPlainDateTime(new Date(2014, 0, 10));
    expect(isIntervalEmpty({ start: date, end: date })).toBe(true);
  });

  it('returns true for ZonedDateTime input', () => {
    const date = toZonedDateTime(new Date(2014, 0, 10));
    expect(isIntervalEmpty({ start: date, end: date })).toBe(true);
  });
});
