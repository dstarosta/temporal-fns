import { describe } from 'vitest';
import { differenceInDays as dateFnsDifferenceInDays } from 'date-fns';
import { differenceInDays } from '../src/difference-in-days.js';
import { fixtureDates } from './helpers/fixtures.js';
import { testDifferenceInDateFn } from './helpers/test-difference-in-date-fn.js';

const crossMidnightDates = [
  new Date(2026, 5, 19, 23, 0, 0),
  new Date(2026, 5, 20, 1, 0, 0),
  new Date(2026, 5, 21, 23, 30, 0),
];

describe('differenceInDays', () => {
  testDifferenceInDateFn(differenceInDays, dateFnsDifferenceInDays, [
    ...fixtureDates,
    ...crossMidnightDates,
  ]);
});
