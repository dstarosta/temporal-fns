import { describe } from 'vitest';
import { setISOWeek as dateFnsSetISOWeek } from 'date-fns';
import { setISOWeek } from '../src/set-iso-week.js';
import { isoWeekDates } from './helpers/iso-week-fixtures.js';
import { testDateUnitFn } from './helpers/test-date-unit-fn.js';

describe('setISOWeek', () => {
  testDateUnitFn(setISOWeek, dateFnsSetISOWeek, 1, isoWeekDates);
  testDateUnitFn(setISOWeek, dateFnsSetISOWeek, 52, isoWeekDates);
});
