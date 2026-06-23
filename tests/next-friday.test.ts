import { describe } from 'vitest';
import { nextFriday as dateFnsNextFriday } from 'date-fns';
import { nextFriday } from '../src/next-friday.js';
import { testDateTransformFn } from './helpers/test-date-transform-fn.js';

describe('nextFriday', () => {
  testDateTransformFn(nextFriday, dateFnsNextFriday);
});
