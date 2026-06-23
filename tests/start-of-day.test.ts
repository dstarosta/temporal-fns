import { describe } from 'vitest';
import { startOfDay as dateFnsStartOfDay } from 'date-fns';
import { startOfDay } from '../src/start-of-day.js';
import { fixtureDates } from './helpers/fixtures.js';
import { testTimeTransformFn } from './helpers/test-time-transform-fn.js';

const dstDate = new Date(2026, 2, 8, 14, 0, 0); // DST spring-forward day

describe('startOfDay', () => {
  testTimeTransformFn(startOfDay, dateFnsStartOfDay, [...fixtureDates, dstDate]);
});
