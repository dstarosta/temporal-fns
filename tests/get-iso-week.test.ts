import { describe } from 'vitest';
import { getISOWeek as dateFnsGetISOWeek } from 'date-fns';
import { getISOWeek } from '../src/get-iso-week.js';
import { isoWeekDates } from './helpers/iso-week-fixtures.js';
import { testNumericPredicateFn } from './helpers/test-numeric-predicate-fn.js';

describe('getISOWeek', () => {
  testNumericPredicateFn(getISOWeek, dateFnsGetISOWeek, isoWeekDates);
});
