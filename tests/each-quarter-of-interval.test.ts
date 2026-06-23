import { describe } from 'vitest';
import { eachQuarterOfInterval as dateFnsEachQuarterOfInterval } from 'date-fns';
import { eachQuarterOfInterval } from '../src/each-quarter-of-interval.js';
import { testEachOfIntervalFn } from './helpers/test-each-of-interval-fn.js';

describe('eachQuarterOfInterval', () => {
  testEachOfIntervalFn(eachQuarterOfInterval, dateFnsEachQuarterOfInterval, [
    { start: new Date(2014, 1, 6), end: new Date(2014, 7, 10), label: 'forward' },
    { start: new Date(2014, 7, 10), end: new Date(2014, 1, 6), label: 'reversed' },
  ]);
});
