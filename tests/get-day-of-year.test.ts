import { describe } from 'vitest';
import { getDayOfYear as dateFnsGetDayOfYear } from 'date-fns';
import { getDayOfYear } from '../src/get-day-of-year.js';
import { testNumericPredicateFn } from './helpers/test-numeric-predicate-fn.js';

describe('getDayOfYear', () => {
  testNumericPredicateFn(getDayOfYear, dateFnsGetDayOfYear);
});
