import { describe } from 'vitest';
import { getISOWeekYear as dateFnsGetISOWeekYear } from 'date-fns';
import { getISOWeekYear } from '../src/get-iso-week-year.js';
import { isoWeekDates } from './helpers/iso-week-fixtures.js';
import { testNumericPredicateFn } from './helpers/test-numeric-predicate-fn.js';

describe('getISOWeekYear', () => {
  testNumericPredicateFn(getISOWeekYear, dateFnsGetISOWeekYear, isoWeekDates);
});
