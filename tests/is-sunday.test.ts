import { describe } from 'vitest';
import { isSunday as dateFnsIsSunday } from 'date-fns';
import { isSunday } from '../src/is-sunday.js';
import { group10Dates } from './helpers/group10-fixtures.js';
import { testPredicateFn } from './helpers/test-predicate-fn.js';

describe('isSunday', () => {
  testPredicateFn(isSunday, dateFnsIsSunday, group10Dates);
});
