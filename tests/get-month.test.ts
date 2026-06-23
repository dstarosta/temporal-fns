import { describe } from 'vitest';
import { getMonth as dateFnsGetMonth } from 'date-fns';
import { getMonth } from '../src/get-month.js';
import { testNumericPredicateFn } from './helpers/test-numeric-predicate-fn.js';

describe('getMonth', () => {
  testNumericPredicateFn(getMonth, dateFnsGetMonth);
});
