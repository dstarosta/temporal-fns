import { describe } from 'vitest';
import { differenceInWeeks as dateFnsDifferenceInWeeks } from 'date-fns';
import { differenceInWeeks } from '../src/difference-in-weeks.js';
import { fixtureDates } from './helpers/fixtures.js';
import { testDifferenceInDateFn } from './helpers/test-difference-in-date-fn.js';

describe('differenceInWeeks', () => {
  testDifferenceInDateFn(differenceInWeeks, dateFnsDifferenceInWeeks, fixtureDates);
});
