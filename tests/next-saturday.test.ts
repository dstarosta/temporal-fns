import { describe } from 'vitest';
import { nextSaturday as dateFnsNextSaturday } from 'date-fns';
import { nextSaturday } from '../src/next-saturday.js';
import { testDateTransformFn } from './helpers/test-date-transform-fn.js';

describe('nextSaturday', () => {
  testDateTransformFn(nextSaturday, dateFnsNextSaturday);
});
