import { describe } from 'vitest';
import { endOfWeek as dateFnsEndOfWeek } from 'date-fns';
import { endOfWeek } from '../src/end-of-week.js';
import { testWeekFn } from './helpers/test-week-fn.js';

describe('endOfWeek', () => {
  testWeekFn(endOfWeek, dateFnsEndOfWeek);
});
