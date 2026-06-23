import { describe } from 'vitest';
import { getYear as dateFnsGetYear } from 'date-fns';
import { getYear } from '../src/get-year.js';
import { testNumericPredicateFn } from './helpers/test-numeric-predicate-fn.js';

describe('getYear', () => {
  testNumericPredicateFn(getYear, dateFnsGetYear);
});
