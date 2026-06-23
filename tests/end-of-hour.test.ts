import { describe } from 'vitest';
import { endOfHour as dateFnsEndOfHour } from 'date-fns';
import { endOfHour } from '../src/end-of-hour.js';
import { testTimeTransformFn } from './helpers/test-time-transform-fn.js';

describe('endOfHour', () => {
  testTimeTransformFn(endOfHour, dateFnsEndOfHour);
});
