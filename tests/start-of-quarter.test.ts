import { describe } from 'vitest';
import { startOfQuarter as dateFnsStartOfQuarter } from 'date-fns';
import { startOfQuarter } from '../src/start-of-quarter.js';
import { group10Dates } from './helpers/group10-fixtures.js';
import { testDateTransformFn } from './helpers/test-date-transform-fn.js';

describe('startOfQuarter', () => {
  testDateTransformFn(startOfQuarter, dateFnsStartOfQuarter, group10Dates);
});
