import { describe } from 'vitest';
import { isFuture as dateFnsIsFuture } from 'date-fns';
import { isFuture } from '../src/is-future.js';
import { group8Dates, group8Now } from './helpers/group8-fixtures.js';
import { testNowPredicateFn, testNowPredicateFnRealTime } from './helpers/test-now-predicate-fn.js';

describe('isFuture', () => {
  testNowPredicateFn(isFuture, dateFnsIsFuture, group8Now, group8Dates);
  testNowPredicateFnRealTime(isFuture, dateFnsIsFuture, [-86_400_000, 86_400_000]);
});
