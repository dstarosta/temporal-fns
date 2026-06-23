import { describe } from 'vitest';
import { endOfMonth as dateFnsEndOfMonth } from 'date-fns';
import { endOfMonth } from '../src/end-of-month.js';
import { testDateTransformFn } from './helpers/test-date-transform-fn.js';

describe('endOfMonth', () => {
  testDateTransformFn(endOfMonth, dateFnsEndOfMonth);
});
