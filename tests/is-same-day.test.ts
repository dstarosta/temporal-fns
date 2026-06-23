import { describe } from 'vitest';
import { isSameDay as dateFnsIsSameDay } from 'date-fns';
import { isSameDay } from '../src/is-same-day.js';
import { testSameDayFn } from './helpers/test-same-day-fn.js';

describe('isSameDay', () => {
  testSameDayFn(isSameDay, dateFnsIsSameDay);
});
