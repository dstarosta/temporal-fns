import { describe } from 'vitest';
import { setHours as dateFnsSetHours } from 'date-fns';
import { setHours } from '../src/set-hours.js';
import { testTimeUnitFn } from './helpers/test-time-unit-fn.js';

describe('setHours', () => {
  testTimeUnitFn(setHours, dateFnsSetHours, 23);
});
