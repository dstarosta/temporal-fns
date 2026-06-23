import { describe } from 'vitest';
import { previousFriday as dateFnsPreviousFriday } from 'date-fns';
import { previousFriday } from '../src/previous-friday.js';
import { testDateTransformFn } from './helpers/test-date-transform-fn.js';

describe('previousFriday', () => {
  testDateTransformFn(previousFriday, dateFnsPreviousFriday);
});
