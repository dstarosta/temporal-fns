import { describe } from 'vitest';
import { startOfDecade as dateFnsStartOfDecade } from 'date-fns';
import { startOfDecade } from '../src/start-of-decade.js';
import { group10Dates } from './helpers/group10-fixtures.js';
import { testDateTransformFn } from './helpers/test-date-transform-fn.js';

describe('startOfDecade', () => {
  testDateTransformFn(startOfDecade, dateFnsStartOfDecade, group10Dates);
});
