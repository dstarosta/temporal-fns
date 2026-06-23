import { describe } from 'vitest';
import { endOfQuarter as dateFnsEndOfQuarter } from 'date-fns';
import { endOfQuarter } from '../src/end-of-quarter.js';
import { group10Dates } from './helpers/group10-fixtures.js';
import { testDateTransformFn } from './helpers/test-date-transform-fn.js';

describe('endOfQuarter', () => {
  testDateTransformFn(endOfQuarter, dateFnsEndOfQuarter, group10Dates);
});
