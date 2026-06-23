import { describe } from 'vitest';
import { endOfISOWeek as dateFnsEndOfISOWeek } from 'date-fns';
import { endOfISOWeek } from '../src/end-of-iso-week.js';
import { isoWeekDates } from './helpers/iso-week-fixtures.js';
import { testDateTransformFn } from './helpers/test-date-transform-fn.js';

describe('endOfISOWeek', () => {
  testDateTransformFn(endOfISOWeek, dateFnsEndOfISOWeek, isoWeekDates);
});
