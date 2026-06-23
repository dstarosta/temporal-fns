import { describe } from 'vitest';
import { isSameMonth as dateFnsIsSameMonth } from 'date-fns';
import { isSameMonth } from '../src/is-same-month.js';
import { testSameDayFn } from './helpers/test-same-day-fn.js';

describe('isSameMonth', () => {
  testSameDayFn(isSameMonth, dateFnsIsSameMonth);
});
