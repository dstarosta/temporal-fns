import { describe } from 'vitest';
import { startOfWeek as dateFnsStartOfWeek } from 'date-fns';
import { startOfWeek } from '../src/start-of-week.js';
import { testWeekFn } from './helpers/test-week-fn.js';

describe('startOfWeek', () => {
  testWeekFn(startOfWeek, dateFnsStartOfWeek);
});
