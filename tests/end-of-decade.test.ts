import { describe } from 'vitest';
import { endOfDecade as dateFnsEndOfDecade } from 'date-fns';
import { endOfDecade } from '../src/end-of-decade.js';
import { group10Dates } from './helpers/group10-fixtures.js';
import { testDateTransformFn } from './helpers/test-date-transform-fn.js';

describe('endOfDecade', () => {
  testDateTransformFn(endOfDecade, dateFnsEndOfDecade, group10Dates);
});
