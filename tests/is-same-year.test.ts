import { describe } from 'vitest';
import { isSameYear as dateFnsIsSameYear } from 'date-fns';
import { isSameYear } from '../src/is-same-year.js';
import { testSameDayFn } from './helpers/test-same-day-fn.js';

describe('isSameYear', () => {
  testSameDayFn(isSameYear, dateFnsIsSameYear);
});
