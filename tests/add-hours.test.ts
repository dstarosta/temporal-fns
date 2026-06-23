import { describe } from 'vitest';
import { addHours as dateFnsAddHours } from 'date-fns';
import { addHours } from '../src/add-hours.js';
import { fixtureDates } from './helpers/fixtures.js';
import { testTimeUnitFn } from './helpers/test-time-unit-fn.js';

// Spans the America/New_York 2026 spring-forward DST transition (Mar 8, 2am -> 3am)
const dstDate = new Date(2026, 2, 8, 1, 0, 0);

describe('addHours', () => {
  testTimeUnitFn(addHours, dateFnsAddHours, 7, [...fixtureDates, dstDate]);
});
