import { describe } from 'vitest';
import { addMilliseconds as dateFnsAddMilliseconds } from 'date-fns';
import { addMilliseconds } from '../src/add-milliseconds.js';
import { testTimeUnitFn } from './helpers/test-time-unit-fn.js';

describe('addMilliseconds', () => {
  testTimeUnitFn(addMilliseconds, dateFnsAddMilliseconds, 1500);
});
