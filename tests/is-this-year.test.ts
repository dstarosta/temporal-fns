import { describe } from 'vitest';
import { isThisYear as dateFnsIsThisYear } from 'date-fns';
import { isThisYear } from '../src/is-this-year.js';
import { group8Dates, group8Now } from './helpers/group8-fixtures.js';
import { testNowPredicateFn, testNowPredicateFnRealTime } from './helpers/test-now-predicate-fn.js';

describe('isThisYear', () => {
  testNowPredicateFn(isThisYear, dateFnsIsThisYear, group8Now, group8Dates);
  testNowPredicateFnRealTime(isThisYear, dateFnsIsThisYear, [
    0,
    -400 * 86_400_000,
    400 * 86_400_000,
  ]);
});
