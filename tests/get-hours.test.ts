import { describe } from 'vitest';
import { getHours as dateFnsGetHours } from 'date-fns';
import { getHours } from '../src/get-hours.js';
import { testNumericTimeFn } from './helpers/test-numeric-time-fn.js';

describe('getHours', () => {
  testNumericTimeFn(getHours, dateFnsGetHours);
});
