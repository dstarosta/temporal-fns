import { describe } from 'vitest';
import { isFirstDayOfMonth as dateFnsIsFirstDayOfMonth } from 'date-fns';
import { isFirstDayOfMonth } from '../src/is-first-day-of-month.js';
import { group10Dates } from './helpers/group10-fixtures.js';
import { testPredicateFn } from './helpers/test-predicate-fn.js';

describe('isFirstDayOfMonth', () => {
  testPredicateFn(isFirstDayOfMonth, dateFnsIsFirstDayOfMonth, group10Dates);
});
