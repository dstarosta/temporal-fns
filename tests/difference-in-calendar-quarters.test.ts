import { describe } from 'vitest';
import { differenceInCalendarQuarters as dateFnsDifferenceInCalendarQuarters } from 'date-fns';
import { differenceInCalendarQuarters } from '../src/difference-in-calendar-quarters.js';
import { testDifferenceInDateFn } from './helpers/test-difference-in-date-fn.js';

describe('differenceInCalendarQuarters', () => {
  testDifferenceInDateFn(differenceInCalendarQuarters, dateFnsDifferenceInCalendarQuarters);
});
