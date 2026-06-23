import { describe } from 'vitest';
import { previousWednesday as dateFnsPreviousWednesday } from 'date-fns';
import { previousWednesday } from '../src/previous-wednesday.js';
import { testDateTransformFn } from './helpers/test-date-transform-fn.js';

describe('previousWednesday', () => {
  testDateTransformFn(previousWednesday, dateFnsPreviousWednesday);
});
