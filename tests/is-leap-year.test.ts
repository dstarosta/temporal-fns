import { describe } from 'vitest';
import { isLeapYear as dateFnsIsLeapYear } from 'date-fns';
import { isLeapYear } from '../src/is-leap-year.js';
import { group10Dates } from './helpers/group10-fixtures.js';
import { testPredicateFn } from './helpers/test-predicate-fn.js';

describe('isLeapYear', () => {
  testPredicateFn(isLeapYear, dateFnsIsLeapYear, group10Dates);
});
