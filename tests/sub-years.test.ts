import { describe } from 'vitest';
import { subYears as dateFnsSubYears } from 'date-fns';
import { subYears } from '../src/sub-years.js';
import { fixtureDates } from './helpers/fixtures.js';
import { testDateUnitFn } from './helpers/test-date-unit-fn.js';

const leapDayDate = new Date(2024, 1, 29, 12, 0, 0, 0); // Feb 29 -> Feb 28 overflow in non-leap year

describe('subYears', () => {
  testDateUnitFn(subYears, dateFnsSubYears, 1, [...fixtureDates, leapDayDate]);
});
