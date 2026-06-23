import { describe } from 'vitest';
import { nextThursday as dateFnsNextThursday } from 'date-fns';
import { nextThursday } from '../src/next-thursday.js';
import { testDateTransformFn } from './helpers/test-date-transform-fn.js';

describe('nextThursday', () => {
  testDateTransformFn(nextThursday, dateFnsNextThursday);
});
