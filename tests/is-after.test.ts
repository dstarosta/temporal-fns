import { describe } from 'vitest';
import { isAfter as dateFnsIsAfter } from 'date-fns';
import { isAfter } from '../src/is-after.js';
import { testCompareFn } from './helpers/test-compare-fn.js';

describe('isAfter', () => {
  testCompareFn(isAfter, dateFnsIsAfter);
});
