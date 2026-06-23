import { describe } from 'vitest';
import { previousSaturday as dateFnsPreviousSaturday } from 'date-fns';
import { previousSaturday } from '../src/previous-saturday.js';
import { testDateTransformFn } from './helpers/test-date-transform-fn.js';

describe('previousSaturday', () => {
  testDateTransformFn(previousSaturday, dateFnsPreviousSaturday);
});
