import { describe } from 'vitest';
import { isYesterday as dateFnsIsYesterday } from 'date-fns';
import { isYesterday } from '../src/is-yesterday.js';
import { group8Dates, group8Now } from './helpers/group8-fixtures.js';
import { testNowPredicateFn, testNowPredicateFnRealTime } from './helpers/test-now-predicate-fn.js';

describe('isYesterday', () => {
  testNowPredicateFn(isYesterday, dateFnsIsYesterday, group8Now, group8Dates);
  testNowPredicateFnRealTime(isYesterday, dateFnsIsYesterday, [0, -86_400_000, 86_400_000]);
});
