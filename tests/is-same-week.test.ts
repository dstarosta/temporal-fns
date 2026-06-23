import { describe } from 'vitest';
import { isSameWeek as dateFnsIsSameWeek } from 'date-fns';
import { isSameWeek } from '../src/is-same-week.js';
import { testSameWeekFn } from './helpers/test-same-week-fn.js';

describe('isSameWeek', () => {
  testSameWeekFn(isSameWeek, dateFnsIsSameWeek);
});
