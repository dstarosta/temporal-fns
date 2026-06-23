import { describe, expect, it } from 'vitest';
import { max as dateFnsMax } from 'date-fns';
import { max } from '../src/max.js';
import { fixtureDates, toPlainDate, toPlainDateTime, toZonedDateTime } from './helpers/fixtures.js';

describe('max', () => {
  const expected = dateFnsMax(fixtureDates);
  const [firstFixture] = fixtureDates;
  if (firstFixture === undefined) {
    throw new Error('fixtureDates must be non-empty');
  }

  it('matches date-fns for Date input', () => {
    expect(max(fixtureDates)).toEqual(expected);
  });

  it('matches date-fns for PlainDate input', () => {
    const result = max(fixtureDates.map((d) => toPlainDate(d)));
    expect(result).toEqual(toPlainDate(expected));
  });

  it('matches date-fns for PlainDateTime input', () => {
    const result = max(fixtureDates.map((d) => toPlainDateTime(d)));
    expect(result).toEqual(toPlainDateTime(expected));
  });

  it('matches date-fns for ZonedDateTime input', () => {
    const result = max(fixtureDates.map((d) => toZonedDateTime(d)));
    expect(result).toEqual(toZonedDateTime(expected));
  });

  it('returns the only element for a single-element array', () => {
    expect(max([firstFixture])).toEqual(firstFixture);
  });

  it('throws for an empty array', () => {
    expect(() => max([])).toThrow(RangeError);
  });
});
