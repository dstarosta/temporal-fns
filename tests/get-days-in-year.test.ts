import { describe } from 'vitest';
import { getDaysInYear as dateFnsGetDaysInYear } from 'date-fns';
import { getDaysInYear } from '../src/get-days-in-year.js';
import { testNumericPredicateFn } from './helpers/test-numeric-predicate-fn.js';

describe('getDaysInYear', () => {
  testNumericPredicateFn(getDaysInYear, dateFnsGetDaysInYear);
});
