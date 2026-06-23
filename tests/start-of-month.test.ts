import { describe } from 'vitest';
import { startOfMonth as dateFnsStartOfMonth } from 'date-fns';
import { startOfMonth } from '../src/start-of-month.js';
import { testDateTransformFn } from './helpers/test-date-transform-fn.js';

describe('startOfMonth', () => {
  testDateTransformFn(startOfMonth, dateFnsStartOfMonth);
});
