import { describe } from 'vitest';
import { getISODay as dateFnsGetISODay } from 'date-fns';
import { getISODay } from '../src/get-iso-day.js';
import { fixtureDates } from './helpers/fixtures.js';
import { testNumericPredicateFn } from './helpers/test-numeric-predicate-fn.js';

const sunday = new Date(2026, 5, 21, 10, 0, 0); // Sunday

describe('getISODay', () => {
  testNumericPredicateFn(getISODay, dateFnsGetISODay, [...fixtureDates, sunday]);
});
