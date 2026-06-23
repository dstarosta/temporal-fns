import { describe } from 'vitest';
import { lastDayOfMonth as dateFnsLastDayOfMonth } from 'date-fns';
import { lastDayOfMonth } from '../src/last-day-of-month.js';
import { group10Dates } from './helpers/group10-fixtures.js';
import { testDateTransformFn } from './helpers/test-date-transform-fn.js';

describe('lastDayOfMonth', () => {
  testDateTransformFn(lastDayOfMonth, dateFnsLastDayOfMonth, group10Dates);
});
