import { describe } from 'vitest';
import { subMilliseconds as dateFnsSubMilliseconds } from 'date-fns';
import { subMilliseconds } from '../src/sub-milliseconds.js';
import { testTimeUnitFn } from './helpers/test-time-unit-fn.js';

describe('subMilliseconds', () => {
  testTimeUnitFn(subMilliseconds, dateFnsSubMilliseconds, 1500);
});
