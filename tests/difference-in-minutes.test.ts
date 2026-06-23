import { describe } from 'vitest';
import { differenceInMinutes as dateFnsDifferenceInMinutes } from 'date-fns';
import { differenceInMinutes } from '../src/difference-in-minutes.js';
import { testDifferenceInTimeFn } from './helpers/test-difference-in-time-fn.js';

describe('differenceInMinutes', () => {
  testDifferenceInTimeFn(differenceInMinutes, dateFnsDifferenceInMinutes);
});
