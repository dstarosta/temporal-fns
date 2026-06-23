import { describe } from 'vitest';
import { isWednesday as dateFnsIsWednesday } from 'date-fns';
import { isWednesday } from '../src/is-wednesday.js';
import { group10Dates } from './helpers/group10-fixtures.js';
import { testPredicateFn } from './helpers/test-predicate-fn.js';

describe('isWednesday', () => {
  testPredicateFn(isWednesday, dateFnsIsWednesday, group10Dates);
});
