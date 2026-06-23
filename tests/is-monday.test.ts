import { describe } from 'vitest';
import { isMonday as dateFnsIsMonday } from 'date-fns';
import { isMonday } from '../src/is-monday.js';
import { group10Dates } from './helpers/group10-fixtures.js';
import { testPredicateFn } from './helpers/test-predicate-fn.js';

describe('isMonday', () => {
  testPredicateFn(isMonday, dateFnsIsMonday, group10Dates);
});
