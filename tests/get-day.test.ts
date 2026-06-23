import { describe } from 'vitest';
import { getDay as dateFnsGetDay } from 'date-fns';
import { getDay } from '../src/get-day.js';
import { fixtureDates } from './helpers/fixtures.js';
import { testNumericPredicateFn } from './helpers/test-numeric-predicate-fn.js';

const sunday = new Date(2026, 5, 21, 10, 0, 0); // Sunday

describe('getDay', () => {
  testNumericPredicateFn(getDay, dateFnsGetDay, [...fixtureDates, sunday]);
});
