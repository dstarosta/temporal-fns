import { describe } from 'vitest';
import { isSameQuarter as dateFnsIsSameQuarter } from 'date-fns';
import { isSameQuarter } from '../src/is-same-quarter.js';
import { testSameDayFn } from './helpers/test-same-day-fn.js';

describe('isSameQuarter', () => {
  testSameDayFn(isSameQuarter, dateFnsIsSameQuarter);
});
