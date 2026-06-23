import { describe } from 'vitest';
import { isFriday as dateFnsIsFriday } from 'date-fns';
import { isFriday } from '../src/is-friday.js';
import { group10Dates } from './helpers/group10-fixtures.js';
import { testPredicateFn } from './helpers/test-predicate-fn.js';

describe('isFriday', () => {
  testPredicateFn(isFriday, dateFnsIsFriday, group10Dates);
});
