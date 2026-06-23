import { describe } from 'vitest';
import { lastDayOfYear as dateFnsLastDayOfYear } from 'date-fns';
import { lastDayOfYear } from '../src/last-day-of-year.js';
import { group10Dates } from './helpers/group10-fixtures.js';
import { testDateTransformFn } from './helpers/test-date-transform-fn.js';

describe('lastDayOfYear', () => {
  testDateTransformFn(lastDayOfYear, dateFnsLastDayOfYear, group10Dates);
});
