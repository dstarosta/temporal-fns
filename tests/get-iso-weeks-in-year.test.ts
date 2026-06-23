import { describe } from 'vitest';
import { getISOWeeksInYear as dateFnsGetISOWeeksInYear } from 'date-fns';
import { getISOWeeksInYear } from '../src/get-iso-weeks-in-year.js';
import { isoWeekDates } from './helpers/iso-week-fixtures.js';
import { testNumericPredicateFn } from './helpers/test-numeric-predicate-fn.js';

describe('getISOWeeksInYear', () => {
  testNumericPredicateFn(getISOWeeksInYear, dateFnsGetISOWeeksInYear, isoWeekDates);
});
