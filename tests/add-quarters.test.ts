import { describe } from 'vitest';
import { addQuarters as dateFnsAddQuarters } from 'date-fns';
import { addQuarters } from '../src/add-quarters.js';
import { testDateUnitFn } from './helpers/test-date-unit-fn.js';

describe('addQuarters', () => {
  testDateUnitFn(addQuarters, dateFnsAddQuarters, 1);
});
