import { describe } from 'vitest';
import { subBusinessDays as dateFnsSubBusinessDays } from 'date-fns';
import { subBusinessDays } from '../src/sub-business-days.js';
import { businessDayAmounts, businessDayDates } from './helpers/business-day-fixtures.js';
import { testDateUnitFn } from './helpers/test-date-unit-fn.js';

describe('subBusinessDays', () => {
  for (const amount of businessDayAmounts) {
    describe(`amount=${String(amount)}`, () => {
      testDateUnitFn(subBusinessDays, dateFnsSubBusinessDays, amount, businessDayDates);
    });
  }
});
