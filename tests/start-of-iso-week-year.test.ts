import { describe } from 'vitest';
import { startOfISOWeekYear as dateFnsStartOfISOWeekYear } from 'date-fns';
import { startOfISOWeekYear } from '../src/start-of-iso-week-year.js';
import { isoWeekDates } from './helpers/iso-week-fixtures.js';
import { testDateTransformFn } from './helpers/test-date-transform-fn.js';

describe('startOfISOWeekYear', () => {
  testDateTransformFn(startOfISOWeekYear, dateFnsStartOfISOWeekYear, isoWeekDates);
});
