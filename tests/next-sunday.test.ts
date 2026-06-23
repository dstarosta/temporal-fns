import { describe } from 'vitest';
import { nextSunday as dateFnsNextSunday } from 'date-fns';
import { nextSunday } from '../src/next-sunday.js';
import { testDateTransformFn } from './helpers/test-date-transform-fn.js';

describe('nextSunday', () => {
  testDateTransformFn(nextSunday, dateFnsNextSunday);
});
