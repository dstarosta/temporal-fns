import { describe } from 'vitest';
import { startOfMinute as dateFnsStartOfMinute } from 'date-fns';
import { startOfMinute } from '../src/start-of-minute.js';
import { testTimeTransformFn } from './helpers/test-time-transform-fn.js';

describe('startOfMinute', () => {
  testTimeTransformFn(startOfMinute, dateFnsStartOfMinute);
});
