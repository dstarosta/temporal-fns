import { describe } from 'vitest';
import { isThisWeek as dateFnsIsThisWeek } from 'date-fns';
import { isThisWeek } from '../src/is-this-week.js';
import { group8Dates, group8Now } from './helpers/group8-fixtures.js';
import { testNowPredicateFn, testNowPredicateFnRealTime } from './helpers/test-now-predicate-fn.js';

describe('isThisWeek', () => {
  testNowPredicateFn(isThisWeek, dateFnsIsThisWeek, group8Now, group8Dates);
  testNowPredicateFnRealTime(isThisWeek, dateFnsIsThisWeek, [0, -7 * 86_400_000, 7 * 86_400_000]);
});
