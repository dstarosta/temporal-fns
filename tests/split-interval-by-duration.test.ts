import { describe, expect, it } from 'vitest';
import { splitIntervalByDuration } from '../src/split-interval-by-duration.js';
import { toPlainDate, toPlainDateTime, toZonedDateTime } from './helpers/fixtures.js';

describe('splitIntervalByDuration', () => {
  it('splits into exact-multiple chunks for Date input', () => {
    const result = splitIntervalByDuration(
      { start: new Date(2014, 0, 1), end: new Date(2014, 0, 10) },
      { days: 3 }
    );
    expect(result).toEqual([
      { start: new Date(2014, 0, 1), end: new Date(2014, 0, 4) },
      { start: new Date(2014, 0, 4), end: new Date(2014, 0, 7) },
      { start: new Date(2014, 0, 7), end: new Date(2014, 0, 10) },
    ]);
  });

  it('truncates the final chunk when the length is not an exact multiple', () => {
    const result = splitIntervalByDuration(
      { start: new Date(2014, 0, 1), end: new Date(2014, 0, 8) },
      { days: 3 }
    );
    expect(result).toEqual([
      { start: new Date(2014, 0, 1), end: new Date(2014, 0, 4) },
      { start: new Date(2014, 0, 4), end: new Date(2014, 0, 7) },
      { start: new Date(2014, 0, 7), end: new Date(2014, 0, 8) },
    ]);
  });

  it('returns an empty array for an empty interval', () => {
    const result = splitIntervalByDuration(
      { start: new Date(2014, 0, 5), end: new Date(2014, 0, 5) },
      { days: 1 }
    );
    expect(result).toEqual([]);
  });

  it('normalizes a reversed interval before splitting', () => {
    const result = splitIntervalByDuration(
      { start: new Date(2014, 0, 10), end: new Date(2014, 0, 1) },
      { days: 3 }
    );
    expect(result).toEqual([
      { start: new Date(2014, 0, 1), end: new Date(2014, 0, 4) },
      { start: new Date(2014, 0, 4), end: new Date(2014, 0, 7) },
      { start: new Date(2014, 0, 7), end: new Date(2014, 0, 10) },
    ]);
  });

  it('throws a RangeError for a zero/empty duration', () => {
    expect(() =>
      splitIntervalByDuration({ start: new Date(2014, 0, 1), end: new Date(2014, 0, 10) }, {})
    ).toThrow(RangeError);
  });

  it('splits PlainDate input', () => {
    const result = splitIntervalByDuration(
      { start: toPlainDate(new Date(2014, 0, 1)), end: toPlainDate(new Date(2014, 0, 10)) },
      { days: 3 }
    );
    expect(result).toEqual([
      { start: toPlainDate(new Date(2014, 0, 1)), end: toPlainDate(new Date(2014, 0, 4)) },
      { start: toPlainDate(new Date(2014, 0, 4)), end: toPlainDate(new Date(2014, 0, 7)) },
      { start: toPlainDate(new Date(2014, 0, 7)), end: toPlainDate(new Date(2014, 0, 10)) },
    ]);
  });

  it('splits PlainDateTime input', () => {
    const result = splitIntervalByDuration(
      {
        start: toPlainDateTime(new Date(2014, 0, 1)),
        end: toPlainDateTime(new Date(2014, 0, 10)),
      },
      { days: 3 }
    );
    expect(result).toEqual([
      {
        start: toPlainDateTime(new Date(2014, 0, 1)),
        end: toPlainDateTime(new Date(2014, 0, 4)),
      },
      {
        start: toPlainDateTime(new Date(2014, 0, 4)),
        end: toPlainDateTime(new Date(2014, 0, 7)),
      },
      {
        start: toPlainDateTime(new Date(2014, 0, 7)),
        end: toPlainDateTime(new Date(2014, 0, 10)),
      },
    ]);
  });

  it('splits ZonedDateTime input', () => {
    const result = splitIntervalByDuration(
      {
        start: toZonedDateTime(new Date(2014, 0, 1)),
        end: toZonedDateTime(new Date(2014, 0, 10)),
      },
      { days: 3 }
    );
    expect(result).toEqual([
      {
        start: toZonedDateTime(new Date(2014, 0, 1)),
        end: toZonedDateTime(new Date(2014, 0, 4)),
      },
      {
        start: toZonedDateTime(new Date(2014, 0, 4)),
        end: toZonedDateTime(new Date(2014, 0, 7)),
      },
      {
        start: toZonedDateTime(new Date(2014, 0, 7)),
        end: toZonedDateTime(new Date(2014, 0, 10)),
      },
    ]);
  });
});
