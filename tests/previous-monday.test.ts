import { describe } from 'vitest';
import { previousMonday as dateFnsPreviousMonday } from 'date-fns';
import { previousMonday } from '../src/previous-monday.js';
import { testDateTransformFn } from './helpers/test-date-transform-fn.js';

describe('previousMonday', () => {
  testDateTransformFn(previousMonday, dateFnsPreviousMonday);
});
