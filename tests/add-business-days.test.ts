import { describe } from 'vitest';
import { addBusinessDays as dateFnsAddBusinessDays } from 'date-fns';
import { addBusinessDays } from '../src/add-business-days.js';
import { businessDayAmounts, businessDayDates } from './helpers/business-day-fixtures.js';
import { testDateUnitFn } from './helpers/test-date-unit-fn.js';

describe('addBusinessDays', () => {
  for (const amount of businessDayAmounts) {
    describe(`amount=${String(amount)}`, () => {
      testDateUnitFn(addBusinessDays, dateFnsAddBusinessDays, amount, businessDayDates);
    });
  }
});
