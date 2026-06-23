import { describe } from 'vitest';
import { nextWednesday as dateFnsNextWednesday } from 'date-fns';
import { nextWednesday } from '../src/next-wednesday.js';
import { testDateTransformFn } from './helpers/test-date-transform-fn.js';

describe('nextWednesday', () => {
  testDateTransformFn(nextWednesday, dateFnsNextWednesday);
});
