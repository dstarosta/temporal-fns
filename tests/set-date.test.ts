import { describe } from 'vitest';
import { setDate as dateFnsSetDate } from 'date-fns';
import { setDate } from '../src/set-date.js';
import { fixtureDates } from './helpers/fixtures.js';
import { testDateUnitFn } from './helpers/test-date-unit-fn.js';

describe('setDate', () => {
  testDateUnitFn(setDate, dateFnsSetDate, 15, fixtureDates);
  testDateUnitFn(setDate, dateFnsSetDate, 31, fixtureDates); // overflow case
  testDateUnitFn(setDate, dateFnsSetDate, 0, fixtureDates); // previous-month case
});
