import { describe } from 'vitest';
import { subSeconds as dateFnsSubSeconds } from 'date-fns';
import { subSeconds } from '../src/sub-seconds.js';
import { testTimeUnitFn } from './helpers/test-time-unit-fn.js';

describe('subSeconds', () => {
  testTimeUnitFn(subSeconds, dateFnsSubSeconds, 130);
});
