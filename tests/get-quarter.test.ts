import { describe } from 'vitest';
import { getQuarter as dateFnsGetQuarter } from 'date-fns';
import { getQuarter } from '../src/get-quarter.js';
import { testNumericPredicateFn } from './helpers/test-numeric-predicate-fn.js';

describe('getQuarter', () => {
  testNumericPredicateFn(getQuarter, dateFnsGetQuarter);
});
