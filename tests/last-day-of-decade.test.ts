import { describe } from 'vitest';
import { lastDayOfDecade as dateFnsLastDayOfDecade } from 'date-fns';
import { lastDayOfDecade } from '../src/last-day-of-decade.js';
import { group10Dates } from './helpers/group10-fixtures.js';
import { testDateTransformFn } from './helpers/test-date-transform-fn.js';

describe('lastDayOfDecade', () => {
  testDateTransformFn(lastDayOfDecade, dateFnsLastDayOfDecade, group10Dates);
});
