import { describe } from 'vitest';
import { subMinutes as dateFnsSubMinutes } from 'date-fns';
import { subMinutes } from '../src/sub-minutes.js';
import { fixtureDates } from './helpers/fixtures.js';
import { testTimeUnitFn } from './helpers/test-time-unit-fn.js';

// Spans the America/New_York 2026 spring-forward DST transition (Mar 8, 2am -> 3am)
const dstDate = new Date(2026, 2, 8, 4, 0, 0);

describe('subMinutes', () => {
  testTimeUnitFn(subMinutes, dateFnsSubMinutes, 90, [...fixtureDates, dstDate]);
});
