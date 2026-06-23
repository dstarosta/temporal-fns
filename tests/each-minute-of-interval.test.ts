import { describe } from 'vitest';
import { eachMinuteOfInterval as dateFnsEachMinuteOfInterval } from 'date-fns';
import { eachMinuteOfInterval } from '../src/each-minute-of-interval.js';
import { testEachOfIntervalTimeFn } from './helpers/test-each-of-interval-time-fn.js';

describe('eachMinuteOfInterval', () => {
  testEachOfIntervalTimeFn(eachMinuteOfInterval, dateFnsEachMinuteOfInterval, [
    {
      start: new Date(2014, 9, 14, 13),
      end: new Date(2014, 9, 14, 13, 3),
      label: 'forward',
    },
    {
      start: new Date(2014, 9, 14, 13, 3),
      end: new Date(2014, 9, 14, 13),
      label: 'reversed',
    },
    {
      start: new Date(2014, 9, 14, 13),
      end: new Date(2014, 9, 14, 13, 10),
      options: { step: 5 },
      label: 'step 5',
    },
  ]);
});
