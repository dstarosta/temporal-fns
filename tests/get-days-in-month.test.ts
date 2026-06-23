import { describe } from 'vitest';
import { getDaysInMonth as dateFnsGetDaysInMonth } from 'date-fns';
import { getDaysInMonth } from '../src/get-days-in-month.js';
import { testNumericPredicateFn } from './helpers/test-numeric-predicate-fn.js';

describe('getDaysInMonth', () => {
  testNumericPredicateFn(getDaysInMonth, dateFnsGetDaysInMonth);
});
