import { describe } from 'vitest';
import { isBefore as dateFnsIsBefore } from 'date-fns';
import { isBefore } from '../src/is-before.js';
import { testCompareFn } from './helpers/test-compare-fn.js';

describe('isBefore', () => {
  testCompareFn(isBefore, dateFnsIsBefore);
});
