import { describe } from 'vitest';
import { isThursday as dateFnsIsThursday } from 'date-fns';
import { isThursday } from '../src/is-thursday.js';
import { group10Dates } from './helpers/group10-fixtures.js';
import { testPredicateFn } from './helpers/test-predicate-fn.js';

describe('isThursday', () => {
  testPredicateFn(isThursday, dateFnsIsThursday, group10Dates);
});
