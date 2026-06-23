import { describe } from 'vitest';
import { eachDayOfInterval as dateFnsEachDayOfInterval } from 'date-fns';
import { eachDayOfInterval } from '../src/each-day-of-interval.js';
import { testEachOfIntervalFn } from './helpers/test-each-of-interval-fn.js';

describe('eachDayOfInterval', () => {
  testEachOfIntervalFn(eachDayOfInterval, dateFnsEachDayOfInterval, [
    { start: new Date(2014, 9, 6), end: new Date(2014, 9, 10), label: 'forward' },
    { start: new Date(2014, 9, 10), end: new Date(2014, 9, 6), label: 'reversed' },
    {
      start: new Date(2014, 9, 6),
      end: new Date(2014, 9, 10),
      options: { step: 2 },
      label: 'step 2',
    },
    {
      start: new Date(2014, 9, 6),
      end: new Date(2014, 9, 10),
      options: { step: -1 },
      label: 'step -1',
    },
    {
      start: new Date(2014, 9, 6),
      end: new Date(2014, 9, 10),
      options: { step: 0 },
      label: 'step 0',
    },
    { start: new Date(2014, 1, 27), end: new Date(2014, 1, 27), label: 'single day' },
    {
      start: new Date(2024, 1, 27),
      end: new Date(2024, 2, 1),
      label: 'across leap day',
    },
  ]);
});
