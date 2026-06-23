import { describe } from 'vitest';
import { differenceInCalendarISOWeeks as dateFnsDifferenceInCalendarISOWeeks } from 'date-fns';
import { differenceInCalendarISOWeeks } from '../src/difference-in-calendar-iso-weeks.js';
import { isoWeekDates } from './helpers/iso-week-fixtures.js';
import { testDifferenceInDateFn } from './helpers/test-difference-in-date-fn.js';

describe('differenceInCalendarISOWeeks', () => {
  testDifferenceInDateFn(
    differenceInCalendarISOWeeks,
    dateFnsDifferenceInCalendarISOWeeks,
    isoWeekDates
  );
});
