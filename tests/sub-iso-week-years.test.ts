import { describe } from 'vitest';
import { subISOWeekYears as dateFnsSubISOWeekYears } from 'date-fns';
import { subISOWeekYears } from '../src/sub-iso-week-years.js';
import { isoWeekDates } from './helpers/iso-week-fixtures.js';
import { testDateUnitFn } from './helpers/test-date-unit-fn.js';

describe('subISOWeekYears', () => {
  testDateUnitFn(subISOWeekYears, dateFnsSubISOWeekYears, 3, isoWeekDates);
});
