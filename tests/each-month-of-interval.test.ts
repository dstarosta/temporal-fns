import { describe } from 'vitest';
import { eachMonthOfInterval as dateFnsEachMonthOfInterval } from 'date-fns';
import { eachMonthOfInterval } from '../src/each-month-of-interval.js';
import { testEachOfIntervalFn } from './helpers/test-each-of-interval-fn.js';

describe('eachMonthOfInterval', () => {
  testEachOfIntervalFn(eachMonthOfInterval, dateFnsEachMonthOfInterval, [
    { start: new Date(2014, 1, 6), end: new Date(2014, 7, 10), label: 'forward' },
    { start: new Date(2014, 7, 10), end: new Date(2014, 1, 6), label: 'reversed' },
    {
      start: new Date(2014, 1, 6),
      end: new Date(2014, 7, 10),
      options: { step: 3 },
      label: 'step 3',
    },
  ]);
});
