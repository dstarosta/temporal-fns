import { describe } from 'vitest';
import { isPast as dateFnsIsPast } from 'date-fns';
import { isPast } from '../src/is-past.js';
import { group8Dates, group8Now } from './helpers/group8-fixtures.js';
import { testNowPredicateFn, testNowPredicateFnRealTime } from './helpers/test-now-predicate-fn.js';

describe('isPast', () => {
  testNowPredicateFn(isPast, dateFnsIsPast, group8Now, group8Dates);
  testNowPredicateFnRealTime(isPast, dateFnsIsPast, [-86_400_000, 86_400_000]);
});
