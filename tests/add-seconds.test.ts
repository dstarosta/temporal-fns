import { describe } from 'vitest';
import { addSeconds as dateFnsAddSeconds } from 'date-fns';
import { addSeconds } from '../src/add-seconds.js';
import { testTimeUnitFn } from './helpers/test-time-unit-fn.js';

describe('addSeconds', () => {
  testTimeUnitFn(addSeconds, dateFnsAddSeconds, 130);
});
