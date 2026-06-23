import { describe } from 'vitest';
import { addWeeks as dateFnsAddWeeks } from 'date-fns';
import { addWeeks } from '../src/add-weeks.js';
import { testDateUnitFn } from './helpers/test-date-unit-fn.js';

describe('addWeeks', () => {
  testDateUnitFn(addWeeks, dateFnsAddWeeks, 2);
});
