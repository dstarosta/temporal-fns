import { describe } from 'vitest';
import { lastDayOfISOWeekYear as dateFnsLastDayOfISOWeekYear } from 'date-fns';
import { lastDayOfISOWeekYear } from '../src/last-day-of-iso-week-year.js';
import { isoWeekDates } from './helpers/iso-week-fixtures.js';
import { testDateTransformFn } from './helpers/test-date-transform-fn.js';

describe('lastDayOfISOWeekYear', () => {
  testDateTransformFn(lastDayOfISOWeekYear, dateFnsLastDayOfISOWeekYear, isoWeekDates);
});
