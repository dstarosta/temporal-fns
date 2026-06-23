import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { constructNow as dateFnsConstructNow } from 'date-fns';
import { constructNow } from '../src/construct-now.js';
import { group8Now } from './helpers/group8-fixtures.js';
import { toPlainDate, toPlainDateTime, toZonedDateTime } from './helpers/fixtures.js';

describe('constructNow', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(group8Now);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('matches date-fns for Date input', () => {
    expect(constructNow(new Date(2020, 0, 1))).toEqual(dateFnsConstructNow(new Date(2020, 0, 1)));
  });

  it('returns the system calendar date for PlainDate input', () => {
    const sample = toPlainDate(new Date(2020, 0, 1));
    const result = constructNow(sample);
    expect(result.toString()).toBe(Temporal.Now.plainDateISO().toString());
  });
});

describe('constructNow (real time, Temporal.Now is not mockable)', () => {
  it('returns UTC now for PlainDateTime input', () => {
    const sample = toPlainDateTime(new Date(2020, 0, 1));
    const result = constructNow(sample);
    const expected = Temporal.Now.plainDateTimeISO('UTC');
    const diffMs = Math.abs(result.since(expected, { largestUnit: 'milliseconds' }).milliseconds);
    expect(diffMs).toBeLessThan(1000);
  });

  it("returns now in the input's own timezone for ZonedDateTime input", () => {
    const sample = toZonedDateTime(new Date(2020, 0, 1), 'Asia/Tokyo');
    const result = constructNow(sample);
    const expected = Temporal.Now.zonedDateTimeISO('Asia/Tokyo');
    expect(result.timeZoneId).toBe('Asia/Tokyo');
    const diffMs = Math.abs(result.epochMilliseconds - expected.epochMilliseconds);
    expect(diffMs).toBeLessThan(1000);
  });
});
