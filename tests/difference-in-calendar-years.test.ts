import { describe } from 'vitest';
import { differenceInCalendarYears as dateFnsDifferenceInCalendarYears } from 'date-fns';
import { differenceInCalendarYears } from '../src/difference-in-calendar-years.js';
import { testDifferenceInDateFn } from './helpers/test-difference-in-date-fn.js';

describe('differenceInCalendarYears', () => {
  testDifferenceInDateFn(differenceInCalendarYears, dateFnsDifferenceInCalendarYears);
});
