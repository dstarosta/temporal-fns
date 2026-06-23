import { describe } from 'vitest';
import { startOfYear as dateFnsStartOfYear } from 'date-fns';
import { startOfYear } from '../src/start-of-year.js';
import { testDateTransformFn } from './helpers/test-date-transform-fn.js';

describe('startOfYear', () => {
  testDateTransformFn(startOfYear, dateFnsStartOfYear);
});
