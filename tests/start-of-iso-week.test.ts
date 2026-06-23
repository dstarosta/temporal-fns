import { describe } from 'vitest';
import { startOfISOWeek as dateFnsStartOfISOWeek } from 'date-fns';
import { startOfISOWeek } from '../src/start-of-iso-week.js';
import { isoWeekDates } from './helpers/iso-week-fixtures.js';
import { testDateTransformFn } from './helpers/test-date-transform-fn.js';

describe('startOfISOWeek', () => {
  testDateTransformFn(startOfISOWeek, dateFnsStartOfISOWeek, isoWeekDates);
});
