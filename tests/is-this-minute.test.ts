import { describe } from 'vitest';
import { isThisMinute as dateFnsIsThisMinute } from 'date-fns';
import { isThisMinute } from '../src/is-this-minute.js';
import { group8Now, group8SubDayDates } from './helpers/group8-fixtures.js';
import {
  testNowPredicateTimeFn,
  testNowPredicateTimeFnRealTime,
} from './helpers/test-now-predicate-time-fn.js';

describe('isThisMinute', () => {
  testNowPredicateTimeFn(isThisMinute, dateFnsIsThisMinute, group8Now, group8SubDayDates);
  testNowPredicateTimeFnRealTime(isThisMinute, dateFnsIsThisMinute, [0, -60_000, 60_000]);
});
