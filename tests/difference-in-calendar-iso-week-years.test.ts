import { describe } from 'vitest';
import { differenceInCalendarISOWeekYears as dateFnsDifferenceInCalendarISOWeekYears } from 'date-fns';
import { differenceInCalendarISOWeekYears } from '../src/difference-in-calendar-iso-week-years.js';
import { isoWeekDates } from './helpers/iso-week-fixtures.js';
import { testDifferenceInDateFn } from './helpers/test-difference-in-date-fn.js';

describe('differenceInCalendarISOWeekYears', () => {
  testDifferenceInDateFn(
    differenceInCalendarISOWeekYears,
    dateFnsDifferenceInCalendarISOWeekYears,
    isoWeekDates
  );
});
