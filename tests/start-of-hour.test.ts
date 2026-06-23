import { describe } from 'vitest';
import { startOfHour as dateFnsStartOfHour } from 'date-fns';
import { startOfHour } from '../src/start-of-hour.js';
import { testTimeTransformFn } from './helpers/test-time-transform-fn.js';

describe('startOfHour', () => {
  testTimeTransformFn(startOfHour, dateFnsStartOfHour);
});
