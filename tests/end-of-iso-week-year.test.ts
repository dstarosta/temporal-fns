import { describe } from 'vitest';
import { endOfISOWeekYear as dateFnsEndOfISOWeekYear } from 'date-fns';
import { endOfISOWeekYear } from '../src/end-of-iso-week-year.js';
import { isoWeekDates } from './helpers/iso-week-fixtures.js';
import { testDateTransformFn } from './helpers/test-date-transform-fn.js';

describe('endOfISOWeekYear', () => {
  testDateTransformFn(endOfISOWeekYear, dateFnsEndOfISOWeekYear, isoWeekDates);
});
