import { describe } from 'vitest';
import { isSameHour as dateFnsIsSameHour } from 'date-fns';
import { isSameHour } from '../src/is-same-hour.js';
import { testSameTimeFn } from './helpers/test-same-time-fn.js';

describe('isSameHour', () => {
  testSameTimeFn(isSameHour, dateFnsIsSameHour);
});
