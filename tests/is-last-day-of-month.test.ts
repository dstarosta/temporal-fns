import { describe } from 'vitest';
import { isLastDayOfMonth as dateFnsIsLastDayOfMonth } from 'date-fns';
import { isLastDayOfMonth } from '../src/is-last-day-of-month.js';
import { group10Dates } from './helpers/group10-fixtures.js';
import { testPredicateFn } from './helpers/test-predicate-fn.js';

describe('isLastDayOfMonth', () => {
  testPredicateFn(isLastDayOfMonth, dateFnsIsLastDayOfMonth, group10Dates);
});
