import { describe } from 'vitest';
import { differenceInMonths as dateFnsDifferenceInMonths } from 'date-fns';
import { differenceInMonths } from '../src/difference-in-months.js';
import { fixtureDates } from './helpers/fixtures.js';
import { testDifferenceInDateFn } from './helpers/test-difference-in-date-fn.js';

// Jan 31 -> Mar 1 exercises date-fns' "last day of month counts as full" rule
const lastDayOfMonthDates = [
  new Date(2026, 0, 31, 10, 0, 0),
  new Date(2026, 2, 1, 9, 0, 0),
  new Date(2026, 2, 1, 11, 0, 0),
  // Mar 31 (later, last day of its month) vs Feb 28 (earlier), exactly
  // 1 calendar month apart: exercises the isLastDayOfMonth override branch.
  new Date(2026, 2, 31, 10, 0, 0),
  new Date(2026, 1, 28, 9, 0, 0),
];

describe('differenceInMonths', () => {
  testDifferenceInDateFn(differenceInMonths, dateFnsDifferenceInMonths, [
    ...fixtureDates,
    ...lastDayOfMonthDates,
  ]);
});
