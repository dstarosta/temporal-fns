import { describe } from 'vitest';
import { compareDesc as dateFnsCompareDesc } from 'date-fns';
import { compareDesc } from '../src/compare-desc.js';
import { testCompareFn } from './helpers/test-compare-fn.js';

describe('compareDesc', () => {
  testCompareFn(compareDesc, dateFnsCompareDesc);
});
