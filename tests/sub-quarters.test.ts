import { describe } from 'vitest';
import { subQuarters as dateFnsSubQuarters } from 'date-fns';
import { subQuarters } from '../src/sub-quarters.js';
import { testDateUnitFn } from './helpers/test-date-unit-fn.js';

describe('subQuarters', () => {
  testDateUnitFn(subQuarters, dateFnsSubQuarters, 1);
});
