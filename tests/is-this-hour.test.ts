import { describe } from 'vitest';
import { isThisHour as dateFnsIsThisHour } from 'date-fns';
import { isThisHour } from '../src/is-this-hour.js';
import { group8Now, group8SubDayDates } from './helpers/group8-fixtures.js';
import {
  testNowPredicateTimeFn,
  testNowPredicateTimeFnRealTime,
} from './helpers/test-now-predicate-time-fn.js';

describe('isThisHour', () => {
  testNowPredicateTimeFn(isThisHour, dateFnsIsThisHour, group8Now, group8SubDayDates);
  testNowPredicateTimeFnRealTime(isThisHour, dateFnsIsThisHour, [0, -3_600_000, 3_600_000]);
});
