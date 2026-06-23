import { describe, expect, it } from 'vitest';
import { differenceInHours as dateFnsDifferenceInHours } from 'date-fns';
import { differenceInHours } from '../src/difference-in-hours.js';
import { fixtureDates } from './helpers/fixtures.js';
import { testDifferenceInTimeFn } from './helpers/test-difference-in-time-fn.js';

// Spans the America/New_York 2026 spring-forward DST transition (Mar 8, 2am -> 3am)
const dstDates = [new Date(2026, 2, 8, 1, 0, 0), new Date(2026, 2, 8, 4, 0, 0)];

describe('differenceInHours', () => {
  testDifferenceInTimeFn(differenceInHours, dateFnsDifferenceInHours, [
    ...fixtureDates,
    ...dstDates,
  ]);

  it('throws when comparing mismatched Temporal types', () => {
    const plainDateTime = Temporal.PlainDateTime.from('2026-06-19T00:00:00');
    const zonedDateTime = Temporal.Now.zonedDateTimeISO('UTC');
    expect(() => differenceInHours(plainDateTime, zonedDateTime as never)).toThrow(TypeError);
  });
});
