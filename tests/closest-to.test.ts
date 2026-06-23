import { describe, expect, it } from 'vitest';
import { closestTo as dateFnsClosestTo } from 'date-fns';
import { closestTo } from '../src/closest-to.js';
import { fixtureDates, toPlainDate, toPlainDateTime, toZonedDateTime } from './helpers/fixtures.js';

describe('closestTo', () => {
  const dateToCompare = new Date(2026, 5, 1);
  const others = fixtureDates;
  const expected = dateFnsClosestTo(dateToCompare, others);
  if (expected === undefined) {
    throw new Error('expected closestTo result to be defined for non-empty fixtures');
  }

  it('matches date-fns for Date input', () => {
    expect(closestTo(dateToCompare, others)).toEqual(expected);
  });

  it('matches date-fns for PlainDate input', () => {
    const result = closestTo(
      toPlainDate(dateToCompare),
      others.map((d) => toPlainDate(d))
    );
    expect(result).toEqual(toPlainDate(expected));
  });

  it('matches date-fns for PlainDateTime input', () => {
    const result = closestTo(
      toPlainDateTime(dateToCompare),
      others.map((d) => toPlainDateTime(d))
    );
    expect(result).toEqual(toPlainDateTime(expected));
  });

  it('matches date-fns for ZonedDateTime input', () => {
    const result = closestTo(
      toZonedDateTime(dateToCompare),
      others.map((d) => toZonedDateTime(d))
    );
    expect(result).toEqual(toZonedDateTime(expected));
  });

  it('returns undefined for an empty array', () => {
    expect(closestTo(dateToCompare, [])).toBeUndefined();
  });
});
