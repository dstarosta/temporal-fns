import { describe, expect, it } from 'vitest';
import { closestIndexTo as dateFnsClosestIndexTo } from 'date-fns';
import { closestIndexTo } from '../src/closest-index-to.js';
import { fixtureDates, toPlainDate, toPlainDateTime, toZonedDateTime } from './helpers/fixtures.js';

describe('closestIndexTo', () => {
  const dateToCompare = new Date(2026, 5, 1);
  const others = fixtureDates;
  const expected = dateFnsClosestIndexTo(dateToCompare, others);

  it('matches date-fns for Date input', () => {
    expect(closestIndexTo(dateToCompare, others)).toBe(expected);
  });

  it('matches date-fns for PlainDate input', () => {
    const result = closestIndexTo(
      toPlainDate(dateToCompare),
      others.map((d) => toPlainDate(d))
    );
    expect(result).toBe(expected);
  });

  it('matches date-fns for PlainDateTime input', () => {
    const result = closestIndexTo(
      toPlainDateTime(dateToCompare),
      others.map((d) => toPlainDateTime(d))
    );
    expect(result).toBe(expected);
  });

  it('matches date-fns for ZonedDateTime input', () => {
    const result = closestIndexTo(
      toZonedDateTime(dateToCompare),
      others.map((d) => toZonedDateTime(d))
    );
    expect(result).toBe(expected);
  });

  it('returns the first index on a tie', () => {
    const a = new Date(2026, 0, 1, 0, 0, 0, 0);
    const b = new Date(2026, 0, 1, 0, 0, 0, 10);
    const c = new Date(2025, 11, 31, 23, 59, 59, 990);
    expect(closestIndexTo(a, [b, c])).toBe(0);
  });

  it('returns undefined for an empty array', () => {
    expect(closestIndexTo(dateToCompare, [])).toBeUndefined();
  });
});
