import { describe } from 'vitest';
import { differenceInCalendarWeeks as dateFnsDifferenceInCalendarWeeks } from 'date-fns';
import { differenceInCalendarWeeks } from '../src/difference-in-calendar-weeks.js';
import { testDifferenceInWeekFn } from './helpers/test-difference-in-week-fn.js';

describe('differenceInCalendarWeeks', () => {
  testDifferenceInWeekFn(differenceInCalendarWeeks, dateFnsDifferenceInCalendarWeeks);
});
