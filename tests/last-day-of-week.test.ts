import { describe } from 'vitest';
import { lastDayOfWeek as dateFnsLastDayOfWeek } from 'date-fns';
import { lastDayOfWeek } from '../src/last-day-of-week.js';
import { testDateTransformFn } from './helpers/test-date-transform-fn.js';

describe('lastDayOfWeek', () => {
  testDateTransformFn(lastDayOfWeek, dateFnsLastDayOfWeek);
});
