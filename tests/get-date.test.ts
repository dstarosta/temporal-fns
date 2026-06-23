import { describe } from 'vitest';
import { getDate as dateFnsGetDate } from 'date-fns';
import { getDate } from '../src/get-date.js';
import { testNumericPredicateFn } from './helpers/test-numeric-predicate-fn.js';

describe('getDate', () => {
  testNumericPredicateFn(getDate, dateFnsGetDate);
});
