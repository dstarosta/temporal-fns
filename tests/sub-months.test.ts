import { describe } from 'vitest';
import { subMonths as dateFnsSubMonths } from 'date-fns';
import { subMonths } from '../src/sub-months.js';
import { fixtureDates } from './helpers/fixtures.js';
import { testDateUnitFn } from './helpers/test-date-unit-fn.js';

const monthOverflowDate = new Date(2026, 2, 31, 10, 0, 0, 0); // Mar 31 -> Feb 28 overflow

describe('subMonths', () => {
  testDateUnitFn(subMonths, dateFnsSubMonths, 1, [...fixtureDates, monthOverflowDate]);
});
