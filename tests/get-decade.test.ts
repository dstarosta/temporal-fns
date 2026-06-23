import { describe } from 'vitest';
import { getDecade as dateFnsGetDecade } from 'date-fns';
import { getDecade } from '../src/get-decade.js';
import { testNumericPredicateFn } from './helpers/test-numeric-predicate-fn.js';

describe('getDecade', () => {
  testNumericPredicateFn(getDecade, dateFnsGetDecade);
});
