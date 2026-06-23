import { describe } from 'vitest';
import { getMilliseconds as dateFnsGetMilliseconds } from 'date-fns';
import { getMilliseconds } from '../src/get-milliseconds.js';
import { testNumericTimeFn } from './helpers/test-numeric-time-fn.js';

describe('getMilliseconds', () => {
  testNumericTimeFn(getMilliseconds, dateFnsGetMilliseconds);
});
