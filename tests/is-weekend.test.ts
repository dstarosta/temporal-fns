import { describe } from 'vitest';
import { isWeekend as dateFnsIsWeekend } from 'date-fns';
import { isWeekend } from '../src/is-weekend.js';
import { fixtureDates } from './helpers/fixtures.js';
import { testPredicateFn } from './helpers/test-predicate-fn.js';

const weekendDates = [
  new Date(2026, 5, 20, 10, 0, 0), // Saturday
  new Date(2026, 5, 21, 10, 0, 0), // Sunday
];

describe('isWeekend', () => {
  testPredicateFn(isWeekend, dateFnsIsWeekend, [...fixtureDates, ...weekendDates]);
});
