import { describe } from 'vitest';
import { endOfYear as dateFnsEndOfYear } from 'date-fns';
import { endOfYear } from '../src/end-of-year.js';
import { testDateTransformFn } from './helpers/test-date-transform-fn.js';

describe('endOfYear', () => {
  testDateTransformFn(endOfYear, dateFnsEndOfYear);
});
