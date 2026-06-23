import { describe } from 'vitest';
import { isSaturday as dateFnsIsSaturday } from 'date-fns';
import { isSaturday } from '../src/is-saturday.js';
import { group10Dates } from './helpers/group10-fixtures.js';
import { testPredicateFn } from './helpers/test-predicate-fn.js';

describe('isSaturday', () => {
  testPredicateFn(isSaturday, dateFnsIsSaturday, group10Dates);
});
