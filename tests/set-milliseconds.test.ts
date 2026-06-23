import { describe } from 'vitest';
import { setMilliseconds as dateFnsSetMilliseconds } from 'date-fns';
import { setMilliseconds } from '../src/set-milliseconds.js';
import { testTimeUnitFn } from './helpers/test-time-unit-fn.js';

describe('setMilliseconds', () => {
  testTimeUnitFn(setMilliseconds, dateFnsSetMilliseconds, 999);
});
