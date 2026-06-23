import { describe } from 'vitest';
import { setQuarter as dateFnsSetQuarter } from 'date-fns';
import { setQuarter } from '../src/set-quarter.js';
import { fixtureDates } from './helpers/fixtures.js';
import { testDateUnitFn } from './helpers/test-date-unit-fn.js';

describe('setQuarter', () => {
  testDateUnitFn(setQuarter, dateFnsSetQuarter, 1, fixtureDates);
  testDateUnitFn(setQuarter, dateFnsSetQuarter, 3, fixtureDates);
  testDateUnitFn(setQuarter, dateFnsSetQuarter, 4, fixtureDates);
});
