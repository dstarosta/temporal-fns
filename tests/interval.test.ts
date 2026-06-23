import { describe, expect, it } from 'vitest';
import { interval as dateFnsInterval } from 'date-fns';
import { interval } from '../src/interval.js';
import { toPlainDate, toPlainDateTime, toZonedDateTime } from './helpers/fixtures.js';

describe('interval', () => {
  const start = new Date(2014, 0, 1);
  const end = new Date(2014, 0, 7);

  it('matches date-fns for Date input', () => {
    expect(interval(start, end)).toEqual(dateFnsInterval(start, end));
  });

  it('matches date-fns for PlainDate input', () => {
    const expected = dateFnsInterval(start, end);
    const result = interval(toPlainDate(start), toPlainDate(end));
    expect(result.start.toString()).toBe(toPlainDate(expected.start).toString());
    expect(result.end.toString()).toBe(toPlainDate(expected.end).toString());
  });

  it('matches date-fns for PlainDateTime input', () => {
    const expected = dateFnsInterval(start, end);
    const result = interval(toPlainDateTime(start), toPlainDateTime(end));
    expect(result.start.toString()).toBe(toPlainDateTime(expected.start).toString());
    expect(result.end.toString()).toBe(toPlainDateTime(expected.end).toString());
  });

  it('matches date-fns for ZonedDateTime input', () => {
    const expected = dateFnsInterval(start, end);
    const result = interval(toZonedDateTime(start), toZonedDateTime(end));
    expect(result.start.toString()).toBe(toZonedDateTime(expected.start).toString());
    expect(result.end.toString()).toBe(toZonedDateTime(expected.end).toString());
  });

  it('does not throw for an inverted interval by default', () => {
    const laterDate = end;
    const earlierDate = start;
    expect(() => interval(laterDate, earlierDate)).not.toThrow();
  });

  it('throws when assertPositive is set and end is before start', () => {
    const laterDate = end;
    const earlierDate = start;
    expect(() => interval(laterDate, earlierDate, { assertPositive: true })).toThrow(TypeError);
  });

  it('does not throw when assertPositive is set and start <= end', () => {
    expect(() => interval(start, end, { assertPositive: true })).not.toThrow();
  });
});
