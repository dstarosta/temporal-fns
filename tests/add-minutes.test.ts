import { describe } from 'vitest';
import { addMinutes as dateFnsAddMinutes } from 'date-fns';
import { addMinutes } from '../src/add-minutes.js';
import { fixtureDates } from './helpers/fixtures.js';
import { testTimeUnitFn } from './helpers/test-time-unit-fn.js';

// Spans the America/New_York 2026 spring-forward DST transition (Mar 8, 2am -> 3am)
const dstDate = new Date(2026, 2, 8, 1, 30, 0);

describe('addMinutes', () => {
  testTimeUnitFn(addMinutes, dateFnsAddMinutes, 90, [...fixtureDates, dstDate]);
});
