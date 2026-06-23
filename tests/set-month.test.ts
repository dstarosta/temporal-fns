import { describe } from 'vitest';
import { setMonth as dateFnsSetMonth } from 'date-fns';
import { setMonth } from '../src/set-month.js';
import { fixtureDates } from './helpers/fixtures.js';
import { testDateUnitFn } from './helpers/test-date-unit-fn.js';

const jan31 = new Date(2026, 0, 31, 10, 0, 0); // Jan 31 -> Feb clamp case

describe('setMonth', () => {
  testDateUnitFn(setMonth, dateFnsSetMonth, 5, [...fixtureDates, jan31]);
  testDateUnitFn(setMonth, dateFnsSetMonth, 1, [...fixtureDates, jan31]); // Feb clamp
});
