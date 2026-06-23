import { describe, expect, it } from 'vitest';
import { min as dateFnsMin } from 'date-fns';
import { min } from '../src/min.js';
import { fixtureDates, toPlainDate, toPlainDateTime, toZonedDateTime } from './helpers/fixtures.js';

describe('min', () => {
  const expected = dateFnsMin(fixtureDates);
  const [firstFixture] = fixtureDates;
  if (firstFixture === undefined) {
    throw new Error('fixtureDates must be non-empty');
  }

  it('matches date-fns for Date input', () => {
    expect(min(fixtureDates)).toEqual(expected);
  });

  it('matches date-fns for PlainDate input', () => {
    const result = min(fixtureDates.map((d) => toPlainDate(d)));
    expect(result).toEqual(toPlainDate(expected));
  });

  it('matches date-fns for PlainDateTime input', () => {
    const result = min(fixtureDates.map((d) => toPlainDateTime(d)));
    expect(result).toEqual(toPlainDateTime(expected));
  });

  it('matches date-fns for ZonedDateTime input', () => {
    const result = min(fixtureDates.map((d) => toZonedDateTime(d)));
    expect(result).toEqual(toZonedDateTime(expected));
  });

  it('returns the only element for a single-element array', () => {
    expect(min([firstFixture])).toEqual(firstFixture);
  });

  it('throws for an empty array', () => {
    expect(() => min([])).toThrow(RangeError);
  });
});
