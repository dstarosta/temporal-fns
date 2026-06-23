import { describe } from 'vitest';
import { setISODay as dateFnsSetISODay } from 'date-fns';
import { setISODay } from '../src/set-iso-day.js';
import { testDateUnitFn } from './helpers/test-date-unit-fn.js';

describe('setISODay', () => {
  for (let day = 1; day <= 7; day++) {
    testDateUnitFn(setISODay, dateFnsSetISODay, day);
  }
});
