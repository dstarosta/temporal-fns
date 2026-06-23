import { describe } from 'vitest';
import { setYear as dateFnsSetYear } from 'date-fns';
import { setYear } from '../src/set-year.js';
import { fixtureDates } from './helpers/fixtures.js';
import { testDateUnitFn } from './helpers/test-date-unit-fn.js';

const leapDayDate = new Date(2024, 1, 29, 12, 0, 0); // Feb 29 -> overflow when target year is non-leap

describe('setYear', () => {
  testDateUnitFn(setYear, dateFnsSetYear, 2030, [...fixtureDates, leapDayDate]);
  testDateUnitFn(setYear, dateFnsSetYear, 2028, [...fixtureDates, leapDayDate]); // leap year target
});
