import { describe, expect, it } from 'vitest';
import { countIntervalUnits } from '../src/count-interval-units.js';
import { toPlainDate, toPlainDateTime, toZonedDateTime } from './helpers/fixtures.js';

describe('countIntervalUnits', () => {
  it('counts whole days, with no rounding needed', () => {
    const result = countIntervalUnits(
      { start: new Date(2014, 0, 1), end: new Date(2014, 0, 10) },
      'days'
    );
    expect(result).toBe(9);
  });

  it('rounds up a partial final unit (step-based, not average-length division)', () => {
    // January 31 -> March 1 spans a full month (Jan31->Feb28/29) plus a partial second month
    // (Feb28/29->Mar1), so this must be 2, not floor(29 days / ~30.44-day average month).
    const result = countIntervalUnits(
      { start: new Date(2014, 0, 31), end: new Date(2014, 2, 1) },
      'months'
    );
    expect(result).toBe(2);
  });

  it('returns 0 for an empty interval', () => {
    const result = countIntervalUnits(
      { start: new Date(2014, 0, 5), end: new Date(2014, 0, 5) },
      'days'
    );
    expect(result).toBe(0);
  });

  it('normalizes a reversed interval before counting', () => {
    const result = countIntervalUnits(
      { start: new Date(2014, 0, 10), end: new Date(2014, 0, 1) },
      'days'
    );
    expect(result).toBe(9);
  });

  it('counts weeks', () => {
    const result = countIntervalUnits(
      { start: new Date(2014, 0, 1), end: new Date(2014, 0, 15) },
      'weeks'
    );
    expect(result).toBe(2);
  });

  it('counts hours for PlainDateTime input', () => {
    const result = countIntervalUnits(
      {
        start: toPlainDateTime(new Date(2014, 0, 1, 0)),
        end: toPlainDateTime(new Date(2014, 0, 1, 5)),
      },
      'hours'
    );
    expect(result).toBe(5);
  });

  it('counts days for PlainDate input', () => {
    const result = countIntervalUnits(
      { start: toPlainDate(new Date(2014, 0, 1)), end: toPlainDate(new Date(2014, 0, 10)) },
      'days'
    );
    expect(result).toBe(9);
  });

  it('counts days for ZonedDateTime input', () => {
    const result = countIntervalUnits(
      { start: toZonedDateTime(new Date(2014, 0, 1)), end: toZonedDateTime(new Date(2014, 0, 10)) },
      'days'
    );
    expect(result).toBe(9);
  });
});
