import { describe } from 'vitest';
import { previousSunday as dateFnsPreviousSunday } from 'date-fns';
import { previousSunday } from '../src/previous-sunday.js';
import { testDateTransformFn } from './helpers/test-date-transform-fn.js';

describe('previousSunday', () => {
  testDateTransformFn(previousSunday, dateFnsPreviousSunday);
});
