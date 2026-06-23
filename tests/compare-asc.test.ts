import { describe } from 'vitest';
import { compareAsc as dateFnsCompareAsc } from 'date-fns';
import { compareAsc } from '../src/compare-asc.js';
import { testCompareFn } from './helpers/test-compare-fn.js';

describe('compareAsc', () => {
  testCompareFn(compareAsc, dateFnsCompareAsc);
});
