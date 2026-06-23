import { describe } from 'vitest';
import { setSeconds as dateFnsSetSeconds } from 'date-fns';
import { setSeconds } from '../src/set-seconds.js';
import { testTimeUnitFn } from './helpers/test-time-unit-fn.js';

describe('setSeconds', () => {
  testTimeUnitFn(setSeconds, dateFnsSetSeconds, 59);
});
