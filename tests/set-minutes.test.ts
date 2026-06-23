import { describe } from 'vitest';
import { setMinutes as dateFnsSetMinutes } from 'date-fns';
import { setMinutes } from '../src/set-minutes.js';
import { testTimeUnitFn } from './helpers/test-time-unit-fn.js';

describe('setMinutes', () => {
  testTimeUnitFn(setMinutes, dateFnsSetMinutes, 59);
});
