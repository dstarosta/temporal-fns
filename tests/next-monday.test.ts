import { describe } from 'vitest';
import { nextMonday as dateFnsNextMonday } from 'date-fns';
import { nextMonday } from '../src/next-monday.js';
import { testDateTransformFn } from './helpers/test-date-transform-fn.js';

describe('nextMonday', () => {
  testDateTransformFn(nextMonday, dateFnsNextMonday);
});
