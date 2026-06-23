import { describe } from 'vitest';
import { isThisSecond as dateFnsIsThisSecond } from 'date-fns';
import { isThisSecond } from '../src/is-this-second.js';
import { group8Now, group8SubDayDates } from './helpers/group8-fixtures.js';
import {
  testNowPredicateTimeFn,
  testNowPredicateTimeFnRealTime,
} from './helpers/test-now-predicate-time-fn.js';

describe('isThisSecond', () => {
  testNowPredicateTimeFn(isThisSecond, dateFnsIsThisSecond, group8Now, group8SubDayDates);
  testNowPredicateTimeFnRealTime(isThisSecond, dateFnsIsThisSecond, [0, -1000, 1000]);
});
