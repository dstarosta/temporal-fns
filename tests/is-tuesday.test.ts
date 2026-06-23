import { describe } from 'vitest';
import { isTuesday as dateFnsIsTuesday } from 'date-fns';
import { isTuesday } from '../src/is-tuesday.js';
import { group10Dates } from './helpers/group10-fixtures.js';
import { testPredicateFn } from './helpers/test-predicate-fn.js';

describe('isTuesday', () => {
  testPredicateFn(isTuesday, dateFnsIsTuesday, group10Dates);
});
