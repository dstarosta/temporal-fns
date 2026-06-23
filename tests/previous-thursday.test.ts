import { describe } from 'vitest';
import { previousThursday as dateFnsPreviousThursday } from 'date-fns';
import { previousThursday } from '../src/previous-thursday.js';
import { testDateTransformFn } from './helpers/test-date-transform-fn.js';

describe('previousThursday', () => {
  testDateTransformFn(previousThursday, dateFnsPreviousThursday);
});
