import { describe } from 'vitest';
import { isThisQuarter as dateFnsIsThisQuarter } from 'date-fns';
import { isThisQuarter } from '../src/is-this-quarter.js';
import { group8Dates, group8Now } from './helpers/group8-fixtures.js';
import { testNowPredicateFn, testNowPredicateFnRealTime } from './helpers/test-now-predicate-fn.js';

describe('isThisQuarter', () => {
  testNowPredicateFn(isThisQuarter, dateFnsIsThisQuarter, group8Now, group8Dates);
  testNowPredicateFnRealTime(isThisQuarter, dateFnsIsThisQuarter, [
    0,
    -100 * 86_400_000,
    100 * 86_400_000,
  ]);
});
