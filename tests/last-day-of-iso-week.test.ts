import { describe } from 'vitest';
import { lastDayOfISOWeek as dateFnsLastDayOfISOWeek } from 'date-fns';
import { lastDayOfISOWeek } from '../src/last-day-of-iso-week.js';
import { isoWeekDates } from './helpers/iso-week-fixtures.js';
import { testDateTransformFn } from './helpers/test-date-transform-fn.js';

describe('lastDayOfISOWeek', () => {
  testDateTransformFn(lastDayOfISOWeek, dateFnsLastDayOfISOWeek, isoWeekDates);
});
