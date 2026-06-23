import { describe } from 'vitest';
import { endOfSecond as dateFnsEndOfSecond } from 'date-fns';
import { endOfSecond } from '../src/end-of-second.js';
import { testTimeTransformFn } from './helpers/test-time-transform-fn.js';

describe('endOfSecond', () => {
  testTimeTransformFn(endOfSecond, dateFnsEndOfSecond);
});
