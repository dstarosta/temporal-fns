import { describe } from 'vitest';
import { setISOWeekYear as dateFnsSetISOWeekYear } from 'date-fns';
import { setISOWeekYear } from '../src/set-iso-week-year.js';
import { isoWeekDates } from './helpers/iso-week-fixtures.js';
import { testDateUnitFn } from './helpers/test-date-unit-fn.js';

describe('setISOWeekYear', () => {
  testDateUnitFn(setISOWeekYear, dateFnsSetISOWeekYear, 2020, isoWeekDates);
  testDateUnitFn(setISOWeekYear, dateFnsSetISOWeekYear, 2030, isoWeekDates);
});
