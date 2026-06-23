import { describe } from 'vitest';
import { subHours as dateFnsSubHours } from 'date-fns';
import { subHours } from '../src/sub-hours.js';
import { fixtureDates } from './helpers/fixtures.js';
import { testTimeUnitFn } from './helpers/test-time-unit-fn.js';

// Spans the America/New_York 2026 spring-forward DST transition (Mar 8, 2am -> 3am)
const dstDate = new Date(2026, 2, 8, 9, 0, 0);

describe('subHours', () => {
  testTimeUnitFn(subHours, dateFnsSubHours, 7, [...fixtureDates, dstDate]);
});
