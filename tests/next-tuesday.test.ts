import { describe } from 'vitest';
import { nextTuesday as dateFnsNextTuesday } from 'date-fns';
import { nextTuesday } from '../src/next-tuesday.js';
import { testDateTransformFn } from './helpers/test-date-transform-fn.js';

describe('nextTuesday', () => {
  testDateTransformFn(nextTuesday, dateFnsNextTuesday);
});
