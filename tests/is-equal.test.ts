import { describe } from 'vitest';
import { isEqual as dateFnsIsEqual } from 'date-fns';
import { isEqual } from '../src/is-equal.js';
import { testCompareFn } from './helpers/test-compare-fn.js';

describe('isEqual', () => {
  testCompareFn(isEqual, dateFnsIsEqual);
});
