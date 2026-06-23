import { describe } from 'vitest';
import { differenceInMilliseconds as dateFnsDifferenceInMilliseconds } from 'date-fns';
import { differenceInMilliseconds } from '../src/difference-in-milliseconds.js';
import { fixtureDates } from './helpers/fixtures.js';
import { testDifferenceInTimeFn } from './helpers/test-difference-in-time-fn.js';

// Spans the America/New_York 2026 spring-forward DST transition (Mar 8, 2am -> 3am)
const dstDates = [new Date(2026, 2, 8, 1, 0, 0), new Date(2026, 2, 8, 4, 0, 0)];

describe('differenceInMilliseconds', () => {
  testDifferenceInTimeFn(differenceInMilliseconds, dateFnsDifferenceInMilliseconds, [
    ...fixtureDates,
    ...dstDates,
  ]);
});
