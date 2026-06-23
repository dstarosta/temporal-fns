import { describe } from 'vitest';
import { addDays as dateFnsAddDays } from 'date-fns';
import { addDays } from '../src/add-days.js';
import { testDateUnitFn } from './helpers/test-date-unit-fn.js';

describe('addDays', () => {
  testDateUnitFn(addDays, dateFnsAddDays, 5);
});

describe('addDays with negative amount', () => {
  testDateUnitFn(addDays, dateFnsAddDays, -3);
});
