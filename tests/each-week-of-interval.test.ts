import { describe } from 'vitest';
import { eachWeekOfInterval as dateFnsEachWeekOfInterval } from 'date-fns';
import { eachWeekOfInterval } from '../src/each-week-of-interval.js';
import { testEachOfIntervalFn } from './helpers/test-each-of-interval-fn.js';

describe('eachWeekOfInterval', () => {
  testEachOfIntervalFn(eachWeekOfInterval, dateFnsEachWeekOfInterval, [
    { start: new Date(2014, 9, 6), end: new Date(2014, 10, 23), label: 'forward' },
    { start: new Date(2014, 10, 23), end: new Date(2014, 9, 6), label: 'reversed' },
    {
      start: new Date(2014, 9, 6),
      end: new Date(2014, 10, 23),
      options: { weekStartsOn: 1 },
      label: 'weekStartsOn 1',
    },
    {
      start: new Date(2014, 9, 6),
      end: new Date(2014, 10, 23),
      options: { step: 2 },
      label: 'step 2',
    },
  ]);
});
