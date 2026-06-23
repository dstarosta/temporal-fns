import { describe } from 'vitest';
import { eachHourOfInterval as dateFnsEachHourOfInterval } from 'date-fns';
import { eachHourOfInterval } from '../src/each-hour-of-interval.js';
import { testEachOfIntervalTimeFn } from './helpers/test-each-of-interval-time-fn.js';

describe('eachHourOfInterval', () => {
  testEachOfIntervalTimeFn(eachHourOfInterval, dateFnsEachHourOfInterval, [
    {
      start: new Date(2014, 9, 6, 12),
      end: new Date(2014, 9, 6, 15),
      label: 'forward',
    },
    {
      start: new Date(2014, 9, 6, 15),
      end: new Date(2014, 9, 6, 12),
      label: 'reversed',
    },
    {
      start: new Date(2014, 9, 6, 12),
      end: new Date(2014, 9, 6, 18),
      options: { step: 2 },
      label: 'step 2',
    },
  ]);
});
