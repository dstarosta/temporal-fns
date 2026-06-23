import { describe } from 'vitest';
import { startOfSecond as dateFnsStartOfSecond } from 'date-fns';
import { startOfSecond } from '../src/start-of-second.js';
import { testTimeTransformFn } from './helpers/test-time-transform-fn.js';

describe('startOfSecond', () => {
  testTimeTransformFn(startOfSecond, dateFnsStartOfSecond);
});
