import { describe } from 'vitest';
import { isThisMonth as dateFnsIsThisMonth } from 'date-fns';
import { isThisMonth } from '../src/is-this-month.js';
import { group8Dates, group8Now } from './helpers/group8-fixtures.js';
import { testNowPredicateFn, testNowPredicateFnRealTime } from './helpers/test-now-predicate-fn.js';

describe('isThisMonth', () => {
  testNowPredicateFn(isThisMonth, dateFnsIsThisMonth, group8Now, group8Dates);
  testNowPredicateFnRealTime(isThisMonth, dateFnsIsThisMonth, [
    0,
    -31 * 86_400_000,
    31 * 86_400_000,
  ]);
});
