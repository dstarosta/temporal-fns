import { describe } from 'vitest';
import { getMinutes as dateFnsGetMinutes } from 'date-fns';
import { getMinutes } from '../src/get-minutes.js';
import { testNumericTimeFn } from './helpers/test-numeric-time-fn.js';

describe('getMinutes', () => {
  testNumericTimeFn(getMinutes, dateFnsGetMinutes);
});
