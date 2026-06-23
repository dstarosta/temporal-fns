import { describe } from 'vitest';
import { differenceInSeconds as dateFnsDifferenceInSeconds } from 'date-fns';
import { differenceInSeconds } from '../src/difference-in-seconds.js';
import { testDifferenceInTimeFn } from './helpers/test-difference-in-time-fn.js';

describe('differenceInSeconds', () => {
  testDifferenceInTimeFn(differenceInSeconds, dateFnsDifferenceInSeconds);
});
