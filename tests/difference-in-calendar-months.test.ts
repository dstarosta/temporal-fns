import { describe } from 'vitest';
import { differenceInCalendarMonths as dateFnsDifferenceInCalendarMonths } from 'date-fns';
import { differenceInCalendarMonths } from '../src/difference-in-calendar-months.js';
import { testDifferenceInDateFn } from './helpers/test-difference-in-date-fn.js';

describe('differenceInCalendarMonths', () => {
  testDifferenceInDateFn(differenceInCalendarMonths, dateFnsDifferenceInCalendarMonths);
});
