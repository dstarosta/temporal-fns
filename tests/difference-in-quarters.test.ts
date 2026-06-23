import { describe } from 'vitest';
import { differenceInQuarters as dateFnsDifferenceInQuarters } from 'date-fns';
import { differenceInQuarters } from '../src/difference-in-quarters.js';
import { testDifferenceInDateFn } from './helpers/test-difference-in-date-fn.js';

describe('differenceInQuarters', () => {
  testDifferenceInDateFn(differenceInQuarters, dateFnsDifferenceInQuarters);
});
