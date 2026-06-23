import { describe } from 'vitest';
import { differenceInBusinessDays as dateFnsDifferenceInBusinessDays } from 'date-fns';
import { differenceInBusinessDays } from '../src/difference-in-business-days.js';
import { businessDayDates } from './helpers/business-day-fixtures.js';
import { testDifferenceInDateFn } from './helpers/test-difference-in-date-fn.js';

describe('differenceInBusinessDays', () => {
  testDifferenceInDateFn(
    differenceInBusinessDays,
    dateFnsDifferenceInBusinessDays,
    businessDayDates
  );
});
