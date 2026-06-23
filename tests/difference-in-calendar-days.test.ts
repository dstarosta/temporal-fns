import { describe } from 'vitest';
import { differenceInCalendarDays as dateFnsDifferenceInCalendarDays } from 'date-fns';
import { differenceInCalendarDays } from '../src/difference-in-calendar-days.js';
import { testDifferenceInDateFn } from './helpers/test-difference-in-date-fn.js';

describe('differenceInCalendarDays', () => {
  testDifferenceInDateFn(differenceInCalendarDays, dateFnsDifferenceInCalendarDays);
});
