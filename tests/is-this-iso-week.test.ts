import { describe } from 'vitest';
import { isThisISOWeek as dateFnsIsThisISOWeek } from 'date-fns';
import { isThisISOWeek } from '../src/is-this-iso-week.js';
import { group8Dates, group8Now } from './helpers/group8-fixtures.js';
import { testNowPredicateFn, testNowPredicateFnRealTime } from './helpers/test-now-predicate-fn.js';

describe('isThisISOWeek', () => {
  testNowPredicateFn(isThisISOWeek, dateFnsIsThisISOWeek, group8Now, group8Dates);
  testNowPredicateFnRealTime(isThisISOWeek, dateFnsIsThisISOWeek, [
    0,
    -7 * 86_400_000,
    7 * 86_400_000,
  ]);
});
