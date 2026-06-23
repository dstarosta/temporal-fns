import { describe } from 'vitest';
import { isTomorrow as dateFnsIsTomorrow } from 'date-fns';
import { isTomorrow } from '../src/is-tomorrow.js';
import { group8Dates, group8Now } from './helpers/group8-fixtures.js';
import { testNowPredicateFn, testNowPredicateFnRealTime } from './helpers/test-now-predicate-fn.js';

describe('isTomorrow', () => {
  testNowPredicateFn(isTomorrow, dateFnsIsTomorrow, group8Now, group8Dates);
  testNowPredicateFnRealTime(isTomorrow, dateFnsIsTomorrow, [0, -86_400_000, 86_400_000]);
});
