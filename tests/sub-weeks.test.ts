import { describe } from 'vitest';
import { subWeeks as dateFnsSubWeeks } from 'date-fns';
import { subWeeks } from '../src/sub-weeks.js';
import { testDateUnitFn } from './helpers/test-date-unit-fn.js';

describe('subWeeks', () => {
  testDateUnitFn(subWeeks, dateFnsSubWeeks, 2);
});
