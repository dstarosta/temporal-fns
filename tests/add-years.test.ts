import { describe } from 'vitest';
import { addYears as dateFnsAddYears } from 'date-fns';
import { addYears } from '../src/add-years.js';
import { fixtureDates } from './helpers/fixtures.js';
import { testDateUnitFn } from './helpers/test-date-unit-fn.js';

const leapDayDate = new Date(2024, 1, 29, 12, 0, 0, 0); // Feb 29 -> Feb 28 overflow in non-leap year

describe('addYears', () => {
  testDateUnitFn(addYears, dateFnsAddYears, 1, [...fixtureDates, leapDayDate]);
});
