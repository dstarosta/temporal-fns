import { describe } from 'vitest';
import { endOfMinute as dateFnsEndOfMinute } from 'date-fns';
import { endOfMinute } from '../src/end-of-minute.js';
import { testTimeTransformFn } from './helpers/test-time-transform-fn.js';

describe('endOfMinute', () => {
  testTimeTransformFn(endOfMinute, dateFnsEndOfMinute);
});
