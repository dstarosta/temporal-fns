import { describe } from 'vitest';
import { differenceInYears as dateFnsDifferenceInYears } from 'date-fns';
import { differenceInYears } from '../src/difference-in-years.js';
import { fixtureDates } from './helpers/fixtures.js';
import { testDifferenceInDateFn } from './helpers/test-difference-in-date-fn.js';

// 31 Dec 2013 -> 11 Feb 2015 is the date-fns doc example for partial-year handling
const partialYearDates = [new Date(2013, 11, 31, 0, 0, 0), new Date(2015, 1, 11, 0, 0, 0)];

describe('differenceInYears', () => {
  testDifferenceInDateFn(differenceInYears, dateFnsDifferenceInYears, [
    ...fixtureDates,
    ...partialYearDates,
  ]);
});
