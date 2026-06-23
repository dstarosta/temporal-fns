import { describe } from 'vitest';
import { eachYearOfInterval as dateFnsEachYearOfInterval } from 'date-fns';
import { eachYearOfInterval } from '../src/each-year-of-interval.js';
import { testEachOfIntervalFn } from './helpers/test-each-of-interval-fn.js';

describe('eachYearOfInterval', () => {
  testEachOfIntervalFn(eachYearOfInterval, dateFnsEachYearOfInterval, [
    { start: new Date(2014, 1, 6), end: new Date(2017, 7, 10), label: 'forward' },
    { start: new Date(2017, 7, 10), end: new Date(2014, 1, 6), label: 'reversed' },
    {
      start: new Date(2014, 1, 6),
      end: new Date(2017, 7, 10),
      options: { step: 2 },
      label: 'step 2',
    },
  ]);
});
