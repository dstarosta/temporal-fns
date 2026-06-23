import { describe } from 'vitest';
import { setDayOfYear as dateFnsSetDayOfYear } from 'date-fns';
import { setDayOfYear } from '../src/set-day-of-year.js';
import { fixtureDates } from './helpers/fixtures.js';
import { testDateUnitFn } from './helpers/test-date-unit-fn.js';

describe('setDayOfYear', () => {
  testDateUnitFn(setDayOfYear, dateFnsSetDayOfYear, 1, fixtureDates);
  testDateUnitFn(setDayOfYear, dateFnsSetDayOfYear, 200, fixtureDates);
  testDateUnitFn(setDayOfYear, dateFnsSetDayOfYear, 366, fixtureDates); // overflow into next year in non-leap years
});
