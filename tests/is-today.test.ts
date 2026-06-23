import { describe } from 'vitest';
import { isToday as dateFnsIsToday } from 'date-fns';
import { isToday } from '../src/is-today.js';
import { group8Dates, group8Now } from './helpers/group8-fixtures.js';
import { testNowPredicateFn, testNowPredicateFnRealTime } from './helpers/test-now-predicate-fn.js';

describe('isToday', () => {
  testNowPredicateFn(isToday, dateFnsIsToday, group8Now, group8Dates);
  testNowPredicateFnRealTime(isToday, dateFnsIsToday, [0, -86_400_000, 86_400_000]);
});
