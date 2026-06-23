import { describe } from 'vitest';
import { addMonths as dateFnsAddMonths } from 'date-fns';
import { addMonths } from '../src/add-months.js';
import { fixtureDates } from './helpers/fixtures.js';
import { testDateUnitFn } from './helpers/test-date-unit-fn.js';

const monthOverflowDate = new Date(2026, 0, 31, 10, 0, 0, 0); // Jan 31 -> Feb 28 overflow

describe('addMonths', () => {
  testDateUnitFn(addMonths, dateFnsAddMonths, 1, [...fixtureDates, monthOverflowDate]);
});
