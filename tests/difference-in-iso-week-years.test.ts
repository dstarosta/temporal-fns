import { describe } from 'vitest';
import { differenceInISOWeekYears as dateFnsDifferenceInISOWeekYears } from 'date-fns';
import { differenceInISOWeekYears } from '../src/difference-in-iso-week-years.js';
import { isoWeekDates } from './helpers/iso-week-fixtures.js';
import { testDifferenceInDateFn } from './helpers/test-difference-in-date-fn.js';

describe('differenceInISOWeekYears', () => {
  testDifferenceInDateFn(differenceInISOWeekYears, dateFnsDifferenceInISOWeekYears, isoWeekDates);
});
