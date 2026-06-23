import { describe } from 'vitest';
import { getSeconds as dateFnsGetSeconds } from 'date-fns';
import { getSeconds } from '../src/get-seconds.js';
import { testNumericTimeFn } from './helpers/test-numeric-time-fn.js';

describe('getSeconds', () => {
  testNumericTimeFn(getSeconds, dateFnsGetSeconds);
});
