import { describe } from 'vitest';
import { subDays as dateFnsSubDays } from 'date-fns';
import { subDays } from '../src/sub-days.js';
import { testDateUnitFn } from './helpers/test-date-unit-fn.js';

describe('subDays', () => {
  testDateUnitFn(subDays, dateFnsSubDays, 5);
});
