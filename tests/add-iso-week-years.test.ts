import { describe } from 'vitest';
import { addISOWeekYears as dateFnsAddISOWeekYears } from 'date-fns';
import { addISOWeekYears } from '../src/add-iso-week-years.js';
import { isoWeekDates } from './helpers/iso-week-fixtures.js';
import { testDateUnitFn } from './helpers/test-date-unit-fn.js';

describe('addISOWeekYears', () => {
  testDateUnitFn(addISOWeekYears, dateFnsAddISOWeekYears, 3, isoWeekDates);
  testDateUnitFn(addISOWeekYears, dateFnsAddISOWeekYears, -3, isoWeekDates);
});
