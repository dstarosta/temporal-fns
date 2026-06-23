import { describe } from 'vitest';
import { lastDayOfQuarter as dateFnsLastDayOfQuarter } from 'date-fns';
import { lastDayOfQuarter } from '../src/last-day-of-quarter.js';
import { group10Dates } from './helpers/group10-fixtures.js';
import { testDateTransformFn } from './helpers/test-date-transform-fn.js';

describe('lastDayOfQuarter', () => {
  testDateTransformFn(lastDayOfQuarter, dateFnsLastDayOfQuarter, group10Dates);
});
