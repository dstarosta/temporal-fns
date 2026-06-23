import { describe } from 'vitest';
import { endOfDay as dateFnsEndOfDay } from 'date-fns';
import { endOfDay } from '../src/end-of-day.js';
import { fixtureDates } from './helpers/fixtures.js';
import { testTimeTransformFn } from './helpers/test-time-transform-fn.js';

const dstDate = new Date(2026, 2, 8, 14, 0, 0); // DST spring-forward day

describe('endOfDay', () => {
  testTimeTransformFn(endOfDay, dateFnsEndOfDay, [...fixtureDates, dstDate]);
});
